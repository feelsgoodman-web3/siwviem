import {
  createContext,
  ElementRef,
  forwardRef,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { updateThemeAppearanceClass } from "./utils";

export type ThemeElement = ElementRef<"div">;
export type ThemeMode = "light" | "dark" | "inherit";

interface ThemeContextState {
  mode?: ThemeMode;
  setMode?: (mode: ThemeMode) => void;
}

interface ThemeProps extends ThemeContextState {
  asChild?: boolean;
  isRoot?: boolean;
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextState | undefined>(
  undefined
);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("`useThemeContext` must be used within a `Theme`");
  }
  return context;
}

const ThemeInnerComponent = forwardRef<ThemeElement, ThemeProps>(
  ({ asChild, mode, children, setMode }, ref) => {
    const parentThemeContext = useContext(ThemeContext);

    const Element = asChild ? Slot : "div";
    const value = useMemo(
      () => ({
        mode: mode || parentThemeContext?.mode || "inherit",
        setMode: setMode || parentThemeContext?.setMode,
      }),
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

const ThemeRoot = forwardRef<ThemeElement, ThemeProps>(
  ({ children, ...props }, ref) => {
    const [currentMode, setCurrentMode] = useState(props.mode || "inherit");
    useEffect(() => setCurrentMode(props.mode || "inherit"), [props.mode]);

    const ExplicitRootAppearanceScript = memo(
      ({ appearance }: { appearance: Exclude<ThemeMode, "inherit"> }) => (
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function(){try{var d=document.documentElement,c=d.classList;c.remove('fs-light','fs-dark');d.style.colorScheme='${appearance}';c.add('fs-${appearance}');}catch(e){}})();`,
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
        <ThemeInnerComponent
          {...props}
          ref={ref}
          mode={currentMode}
          setMode={setCurrentMode}
        >
          {children}
        </ThemeInnerComponent>
      </>
    );
  }
);

ThemeRoot.displayName = "ThemeRoot";

export const ThemeProvider = forwardRef<ThemeElement, ThemeProps>(
  ({ children, ...props }, ref) => {
    const context = useContext(ThemeContext);
    return context ? (
      <ThemeInnerComponent {...props} ref={ref}>
        {children}
      </ThemeInnerComponent>
    ) : (
      <ThemeRoot {...props} ref={ref}>
        {children}
      </ThemeRoot>
    );
  }
);

ThemeProvider.displayName = "ThemeProvider";
