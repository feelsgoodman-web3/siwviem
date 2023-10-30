import nextMdx from "@next/mdx"
import yeet from "./lib/rehype-highlight-code.mjs"

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [yeet],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
}

export default withMDX(nextConfig)
