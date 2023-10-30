/* eslint-disable import/no-extraneous-dependencies,max-lines */
import { dirname, extname, join, relative, resolve } from "path"

import dedent from "dedent"
import { execa } from "execa"
import { default as fs } from "fs-extra"
import type { Options } from "tsup"

type GetConfig = Omit<
  Options,
  "bundle" | "clean" | "dts" | "entry" | "format"
> & {
  dev?: boolean
  drilledEntry?: string[]
  entry?: string[]
  extraExports?: Record<string, string>
  noExport?: string[]
}

/**
 * Generate exports from entry files
 */
async function generateExports(
  entry: string[],
  noExport?: string[],
  extraExports?: Record<string, string>,
) {
  const exports: Exports = {}

  for (const file of entry) {
    if (noExport?.includes(file)) continue
    const extension = extname(file)
    const fileWithoutExtension = file.replace(extension, "")
    const name = fileWithoutExtension
      .replace(/^src\//g, "./")
      .replace(/\/index$/, "")
    const distSourceFile = `${fileWithoutExtension.replace(
      /^src\//g,
      "./dist/",
    )}.js`
    const distTypesFile = `${fileWithoutExtension.replace(
      /^src\//g,
      "./dist/",
    )}.d.ts`

    exports[name] = {
      types: distTypesFile,
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      default: distSourceFile,
    }
  }

  exports["./package.json"] = "./package.json"

  if (extraExports)
    for (const [key, value] of Object.entries(extraExports)) {
      exports[key] = {
        default: value,
      }
    }

  const packageJson = await fs.readJSON("package.json")
  packageJson.exports = exports
  await fs.writeFile(
    "package.json",
    `${JSON.stringify(packageJson, null, 2)}\n`,
  )

  return exports
}

/**
 * Generate proxy packages files for each export
 */
async function generateProxyPackages(exports: Exports) {
  const ignorePaths = []
  const files = new Set<string>()

  for (const [key, value] of Object.entries(exports)) {
    if (typeof value === "string") {
      continue
    }
    if (key === ".") continue
    if (!value.default) continue
    await fs.ensureDir(key)
    const entrypoint = relative(key, value.default)
    const typesEntryPoint = value.types && relative(key, value.types)
    const fileExists = await fs.pathExists(value.default)
    if (!fileExists)
      console.error(
        `Proxy package "${key}" entrypoint "${entrypoint}" does not exist.`,
      )

    await fs.outputFile(
      `${key}/package.json`,
      typesEntryPoint
        ? dedent`{
        "type": "module",
        "main": "${entrypoint}",
        "types": "${typesEntryPoint}"
      }`
        : dedent`{
        "type": "module",
        "main": "${entrypoint}"
      }`,
    )

    ignorePaths.push(key.replace(/^\.\//g, ""))

    const file = key.replace(/^\.\//g, "").split("/")[0]
    if (!file || files.has(file)) continue
    files.add(`/${file}`)
  }

  files.add("/dist")
  const packageJson = await fs.readJSON("package.json")
  // @ts-ignore
  packageJson.files = [...files.values()]
  await fs.writeFile(
    "package.json",
    `${JSON.stringify(packageJson, null, 2)}\n`,
  )

  if (ignorePaths.length === 0) return
  const gitIgnore = await fs.readFile(".gitignore_base", { encoding: "utf-8" })

  await fs.outputFile(
    ".gitignore",
    dedent`
    # Generated file. Do not edit directly.
    ${gitIgnore}
    ${ignorePaths.join("/**\n")}/**
  `,
  )
}

const isDirectory = (source: string) => fs.lstatSync(source).isDirectory()

const getDirectories = (source: string) =>
  fs
    .readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)

export function getConfig({
  dev,
  entry: initEntry,
  extraExports,
  noExport,
  onSuccess,
  ...options
}: GetConfig): Options {
  if (!initEntry?.length) throw new Error("entry is required")

  const entry: string[] = [
    ...(initEntry ?? []),
    ...(options.drilledEntry
      ?.flatMap(getDirectories)
      .map((directory) => `${directory}/index.ts`) ?? []),
  ]

  // Hacks tsup to create Preconstruct-like linked packages for development
  // https://github.com/preconstruct/preconstruct
  if (dev) {
    return {
      clean: true,
      // Only need to generate one file with tsup for development since we will create links in `onSuccess`
      entry: [entry[0] as string],
      format: ["esm"],
      async onSuccess() {
        // remove all files in dist
        await fs.emptyDir("dist")

        // symlink files and type definitions
        for (const file of entry) {
          const filePath = resolve(file)

          const distSourceFile = filePath
            .replace(file, file.replace("src/", "dist/"))
            .replace(/\.ts$/, ".js")

          // Make sure directory exists
          await fs.ensureDir(dirname(distSourceFile))
          // Create symlink between source and dist file
          await fs.symlink(filePath, distSourceFile, "file")

          // Create file linking up type definitions
          const srcTypesFile = relative(
            dirname(distSourceFile),
            filePath,
          ).replace(/\.ts$/, "")

          await fs.outputFile(
            distSourceFile.replace(/\.js$/, ".d.ts"),
            `export * from '${srcTypesFile}'`,
          )
        }

        const exports = await generateExports(entry, noExport, extraExports)
        await generateProxyPackages(exports)
      },
      silent: true,
    }
  }

  return {
    ...options,
    bundle: true,
    clean: true,
    dts: true,
    entry,
    format: ["esm"],
    minify: true,
    async onSuccess() {
      if (typeof onSuccess === "function") await onSuccess()
      if (typeof onSuccess === "string") await execa(onSuccess, { shell: true })

      const exports = await generateExports(entry, noExport, extraExports)

      await generateProxyPackages(exports)
    },
    splitting: true,
    target: "es2021",
  }
}

type Exports = {
  [key: string]: string | { default: string; types?: string }
}
