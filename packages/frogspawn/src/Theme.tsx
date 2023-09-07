import {
  createContext,
  type ElementRef,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Slot } from "@radix-ui/react-slot";

export type ThemeElement = ElementRef<"div">;

interface ThemeContextState {
  mode?: "light" | "dark" | "inherit";
}

interface ThemeProps extends ThemeContextState {
  asChild?: boolean;
  isRoot?: boolean;
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("`useThemeContext` must be used within a `Theme`");
  }
  return context;
}

function updateThemeAppearanceClass(appearance: ThemeProps["mode"]) {
  if (!appearance || appearance === "inherit") return;

  const root = document.documentElement;
  const themes = ["light-theme", "dark-theme", "light", "dark"];
  root.classList.remove(...themes);

  root.style.colorScheme = appearance;

  if (["light", "dark"].includes(appearance)) {
    root.classList.add(appearance);
  } else {
    root.classList.add(`${appearance}-theme`);
  }
}

const ThemeInnerComponent = forwardRef<ThemeElement, ThemeProps>(
  ({ asChild, mode, children }, ref) => {
    const parentThemeContext = useContext(ThemeContext);

    const Element = asChild ? Slot : "div";
    const value = useMemo(
      () => ({ mode: mode || parentThemeContext?.mode || "inherit" }),
      [mode]
    );

    return (
      <ThemeContext.Provider value={value}>
        <Element ref={ref}>{children}</Element>
      </ThemeContext.Provider>
    );
  }
);

ThemeInnerComponent.displayName = "ThemeInnerComponent";

const ThemeRoot = forwardRef<ThemeElement, ThemeProps>((props, ref) => {
  const [currentMode, setCurrentMode] = useState(props.mode || "inherit");
  useEffect(() => setCurrentMode(props.mode || "inherit"), [props.mode]);

  const ExplicitRootAppearanceScript = memo(
    ({
      appearance,
    }: {
      appearance: Exclude<ThemeProps["mode"], "inherit">;
    }) => (
      <script
        dangerouslySetInnerHTML={{
          __html: `!(function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');d.style.colorScheme='${appearance}';c.add('${appearance}');}catch(e){}})();`,
        }}
      ></script>
    ),
    () => true
  );
  ExplicitRootAppearanceScript.displayName = "ExplicitRootAppearanceScript";

  useEffect(() => updateThemeAppearanceClass(props.mode), [props.mode]);

  return (
    <>
      {currentMode !== "inherit" && (
        <ExplicitRootAppearanceScript appearance={currentMode} />
      )}
      <ThemeInnerComponent {...props} ref={ref} mode={currentMode} />
    </>
  );
});

ThemeRoot.displayName = "ThemeRoot";

export const Theme = forwardRef<ThemeElement, ThemeProps>((props, ref) => {
  const context = useContext(ThemeContext);
  return context ? (
    <ThemeInnerComponent {...props} ref={ref} />
  ) : (
    <ThemeRoot {...props} ref={ref} />
  );
});
Theme.displayName = "Theme";
