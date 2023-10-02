import type { ThemeMode } from "./context";

export function updateThemeAppearanceClass(appearance?: ThemeMode) {
  const root = document.documentElement;
  root.classList.add("frogspawn-theme");

  if (!appearance) return;

  const themes = ["fs-light-theme", "fs-dark-theme", "fs-light", "fs-dark"];
  root.classList.remove(...themes);

  root.style.colorScheme = appearance;

  if (["light", "dark"].includes(appearance)) {
    root.classList.add(`fs-${appearance}`);
  } else {
    root.classList.add(`fs-${appearance}-theme`);
  }
}
