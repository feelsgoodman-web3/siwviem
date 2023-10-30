export default function toKebabCase(str: string) {
  return str
    .replace(/[\s_]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-z0-9-]+/gi, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase()
}
