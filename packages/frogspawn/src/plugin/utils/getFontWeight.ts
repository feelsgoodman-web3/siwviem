import { FontWeight } from "../types";

export default function getFontWeight(fontWeight: FontWeight) {
  return {
    "--font-thin": fontWeight.thin,
    "--font-extralight": fontWeight.extralight,
    "--font-light": fontWeight.light,
    "--font-normal": fontWeight.normal,
    "--font-medium": fontWeight.medium,
    "--font-semibold": fontWeight.semibold,
    "--font-bold": fontWeight.bold,
    "--font-extrabold": fontWeight.extrabold,
    "--font-black": fontWeight.black,
    "--default-font-weight": fontWeight.default,
  };
}
