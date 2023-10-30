import clsx from "clsx"
import { describe, expect, it } from "vitest"
import { VariantProps, cvaWithBreakpoints } from "../cvaWithBreakpoints"

describe("cvaWithBreakpoints", () => {
  describe("without base", () => {
    // describe("without anything", () => {
    //   it("empty", () => {
    //     const example = cvaWithBreakpoints();
    //     expect(example()).toBe("");
    //     expect(
    //       example({
    //         // @ts-expect-error
    //         aCheekyInvalidProp: "lol",
    //       })
    //     ).toBe("");
    //     expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
    //     expect(example({ className: "adhoc-className" })).toBe(
    //       "adhoc-className"
    //     );
    //     expect(
    //       example({
    //         class: "adhoc-class",
    //         // @ts-expect-error
    //         className: "adhoc-className",
    //       })
    //     ).toBe("adhoc-class adhoc-className");
    //   });
    //
    //   it("undefined", () => {
    //     const example = cvaWithBreakpoints(undefined);
    //     expect(example()).toBe("");
    //     expect(
    //       example({
    //         // @ts-expect-error
    //         aCheekyInvalidProp: "lol",
    //       })
    //     ).toBe("");
    //     expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
    //     expect(example({ className: "adhoc-className" })).toBe(
    //       "adhoc-className"
    //     );
    //     expect(
    //       example({
    //         class: "adhoc-class",
    //         // @ts-expect-error
    //         className: "adhoc-className",
    //       })
    //     ).toBe("adhoc-class adhoc-className");
    //   });
    //
    //   it("null", () => {
    //     const example = cvaWithBreakpoints(null);
    //     expect(example()).toBe("");
    //     expect(
    //       example({
    //         // @ts-expect-error
    //         aCheekyInvalidProp: "lol",
    //       })
    //     ).toBe("");
    //     expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
    //     expect(example({ className: "adhoc-className" })).toBe(
    //       "adhoc-className"
    //     );
    //     expect(
    //       example({
    //         class: "adhoc-class",
    //         // @ts-expect-error
    //         className: "adhoc-className",
    //       })
    //     ).toBe("adhoc-class adhoc-className");
    //   });
    // });
    describe("without defaults", () => {
      const buttonWithoutBaseWithoutDefaultsString = cvaWithBreakpoints(null, {
        variants: {
          intent: {
            primary:
              "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary:
              "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning:
              "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [
              "button--danger",
              [
                1 && "bg-red-500",
                { baz: false, bat: null },
                ["text-white", ["border-transparent"]],
              ],
              "hover:bg-red-600",
            ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [
              "button--warning-disabled",
              [1 && "text-black", { baz: false, bat: null }],
            ],
          },
        ],
      })
      const buttonWithoutBaseWithoutDefaultsWithClassNameString =
        cvaWithBreakpoints(null, {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              className: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
          ],
        })

      const buttonWithoutBaseWithoutDefaultsArray = cvaWithBreakpoints(null, {
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [
              "button--danger",
              [
                1 && "bg-red-500",
                { baz: false, bat: null },
                ["text-white", ["border-transparent"]],
              ],
              "hover:bg-red-600",
            ],
          },
          disabled: {
            true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
            false: ["button--enabled", "cursor-pointer"],
          },
          size: {
            small: ["button--small", "text-sm", "py-1", "px-2"],
            medium: ["button--medium", "text-base", "py-2", "px-4"],
            large: ["button--large", "text-lg", "py-2.5", "px-4"],
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: ["button--primary-medium", "uppercase"],
          },
          {
            intent: "warning",
            disabled: false,
            class: ["button--warning-enabled", "text-gray-800"],
          },
          {
            intent: "warning",
            disabled: true,
            class: [
              "button--warning-disabled",
              [1 && "text-black", { baz: false, bat: null }],
            ],
          },
        ],
      })
      const buttonWithoutBaseWithoutDefaultsWithClassNameArray =
        cvaWithBreakpoints(null, {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              className: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
          ],
        })

      type ButtonWithoutDefaultsWithoutBaseProps =
        | VariantProps<typeof buttonWithoutBaseWithoutDefaultsString>
        | VariantProps<
            typeof buttonWithoutBaseWithoutDefaultsWithClassNameString
          >
        | VariantProps<typeof buttonWithoutBaseWithoutDefaultsArray>
        | VariantProps<
            typeof buttonWithoutBaseWithoutDefaultsWithClassNameArray
          >

      describe.each<[ButtonWithoutDefaultsWithoutBaseProps, string]>([
        [
          // @ts-expect-error
          undefined,
          "",
        ],
        [{}, ""],
        [
          {
            aCheekyInvalidProp: "lol",
          } as ButtonWithoutDefaultsWithoutBaseProps,
          "",
        ],
        [
          { intent: "secondary" },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],
        [
          { intent: { initial: "secondary", sm: "secondary" } },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 sm:button--secondary sm:bg-white sm:text-gray-800 sm:border-gray-400 sm:hover:bg-gray-100",
        ],
        [{ size: "small" }, "button--small text-sm py-1 px-2"],
        [
          { size: { initial: "small", sm: "small" } },
          "button--small text-sm py-1 px-2 sm:button--small sm:text-sm sm:py-1 sm:px-2",
        ],
        [{ disabled: true }, "button--disabled opacity-050 cursor-not-allowed"],
        [
          { disabled: { initial: true, sm: true } },
          "button--disabled opacity-050 cursor-not-allowed sm:button--disabled sm:opacity-050 sm:cursor-not-allowed",
        ],
        [
          {
            intent: "secondary",
            size: null,
          },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],
        [
          {
            intent: { initial: "secondary", sm: "secondary" },
            size: null,
          },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 sm:button--secondary sm:bg-white sm:text-gray-800 sm:border-gray-400 sm:hover:bg-gray-100",
        ],
        [
          { intent: "secondary", size: undefined },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],
        [
          {
            intent: { initial: "secondary", sm: "secondary" },
            size: undefined,
          },
          "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 sm:button--secondary sm:bg-white sm:text-gray-800 sm:border-gray-400 sm:hover:bg-gray-100",
        ],
        [
          { intent: "danger", size: "medium" },
          "button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4",
        ],
        [
          {
            intent: { initial: "danger", sm: "danger" },
            size: { initial: "medium", sm: "medium" },
          },
          "button--danger bg-red-500 text-white border-transparent hover:bg-red-600 sm:button--danger sm:bg-red-500 sm:text-white sm:border-transparent sm:hover:bg-red-600 button--medium text-base py-2 px-4 sm:button--medium sm:text-base sm:py-2 sm:px-4",
        ],
        [
          { intent: "warning", size: "large" },
          "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4",
        ],
        [
          {
            intent: { initial: "warning", sm: "warning" },
            size: { initial: "large", sm: "large" },
          },
          "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 sm:button--warning sm:bg-yellow-500 sm:border-transparent sm:hover:bg-yellow-600 button--large text-lg py-2.5 px-4 sm:button--large sm:text-lg sm:py-2.5 sm:px-4",
        ],
        [
          { intent: "warning", size: "large", disabled: true },
          "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black",
        ],
        [
          {
            intent: { initial: "warning", sm: "warning" },
            size: { initial: "large", sm: "large" },
            disabled: { initial: true, sm: true },
          },
          "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 sm:button--warning sm:bg-yellow-500 sm:border-transparent sm:hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed sm:button--disabled sm:opacity-050 sm:cursor-not-allowed button--large text-lg py-2.5 px-4 sm:button--large sm:text-lg sm:py-2.5 sm:px-4 button--warning-disabled text-black sm:button--warning-disabled sm:text-black",
        ],
        [
          { intent: "primary", m: 0 },
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-0",
        ],
        [
          {
            intent: { initial: "primary", sm: "primary" },
            m: { initial: 0, sm: 0 },
          },
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 sm:button--primary sm:bg-blue-500 sm:text-white sm:border-transparent sm:hover:bg-blue-600 m-0 sm:m-0",
        ],
        [
          { intent: "primary", m: 1 },
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1",
        ],
        [
          {
            intent: { initial: "primary", sm: "primary" },
            m: { initial: 1, sm: 1 },
          },
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 sm:button--primary sm:bg-blue-500 sm:text-white sm:border-transparent sm:hover:bg-blue-600 m-1 sm:m-1",
        ],
        [
          {
            intent: "primary",
            m: 1,
            class: "adhoc-class",
          } as ButtonWithoutDefaultsWithoutBaseProps,
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-class",
        ],
        [
          {
            intent: { initial: "primary", sm: "primary" },
            m: { initial: 1, sm: 1 },
            class: "adhoc-class",
          } as ButtonWithoutDefaultsWithoutBaseProps,
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 sm:button--primary sm:bg-blue-500 sm:text-white sm:border-transparent sm:hover:bg-blue-600 m-1 sm:m-1 adhoc-class",
        ],
        [
          {
            intent: "primary",
            m: 1,
            className: "adhoc-classname",
          } as ButtonWithoutDefaultsWithoutBaseProps,
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-classname",
        ],
        [
          {
            intent: { initial: "primary", sm: "primary" },
            m: { initial: 1, sm: 1 },
            className: "adhoc-classname",
          } as ButtonWithoutDefaultsWithoutBaseProps,
          "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 sm:button--primary sm:bg-blue-500 sm:text-white sm:border-transparent sm:hover:bg-blue-600 m-1 sm:m-1 adhoc-classname",
        ],
        // typings needed
      ])("button(%o)", (options, expected) => {
        it(`returns ${expected}`, () => {
          expect(buttonWithoutBaseWithoutDefaultsString(options)).toBe(expected)
          expect(
            buttonWithoutBaseWithoutDefaultsWithClassNameString(options),
          ).toBe(expected)
          expect(buttonWithoutBaseWithoutDefaultsArray(options)).toBe(expected)
          expect(
            buttonWithoutBaseWithoutDefaultsWithClassNameArray(options),
          ).toBe(expected)
        })
      })
    })
    describe("with defaults", () => {
      const buttonWithoutBaseWithDefaultsString = cvaWithBreakpoints(
        "button font-semibold border rounded",
        {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              class: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: "button--warning-danger-medium",
            },
          ],
          defaultVariants: {
            m: 0,
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )
      const buttonWithoutBaseWithDefaultsWithClassNameString =
        cvaWithBreakpoints("button font-semibold border rounded", {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              className: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: "button--warning-danger-medium",
            },
          ],
          defaultVariants: {
            m: 0,
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        })

      const buttonWithoutBaseWithDefaultsArray = cvaWithBreakpoints(
        ["button", "font-semibold", "border", "rounded"],
        {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              class: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: ["button--warning-danger", "!border-red-500"],
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: ["button--warning-danger-medium"],
            },
          ],
          defaultVariants: {
            m: 0,
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )
      const buttonWithoutBaseWithDefaultsWithClassNameArray =
        cvaWithBreakpoints(["button", "font-semibold", "border", "rounded"], {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
            m: {
              0: "m-0",
              1: "m-1",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              className: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: "button--warning-danger-medium",
            },
          ],
          defaultVariants: {
            m: 0,
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        })

      type ButtonWithoutBaseWithDefaultsProps =
        | VariantProps<typeof buttonWithoutBaseWithDefaultsString>
        | VariantProps<typeof buttonWithoutBaseWithDefaultsWithClassNameString>
        | VariantProps<typeof buttonWithoutBaseWithDefaultsArray>
        | VariantProps<typeof buttonWithoutBaseWithDefaultsWithClassNameArray>

      describe.each<[ButtonWithoutBaseWithDefaultsProps, string]>([
        [
          // @ts-expect-error
          undefined,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          {},
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          {
            aCheekyInvalidProp: "lol",
          } as ButtonWithoutBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          { intent: "secondary" },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
        ],
        [
          { intent: { initial: "secondary", sm: "secondary" } },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 sm:button--secondary sm:bg-white sm:text-gray-800 sm:border-gray-400 sm:hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
        ],
        [
          { size: "small" },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2 m-0",
        ],
        [
          { size: { initial: "small", sm: "small" } },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2 sm:button--small sm:text-sm sm:py-1 sm:px-2 m-0",
        ],
        [
          { disabled: true },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          { disabled: { initial: true } },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          {
            intent: "secondary",
            size: null,
          },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer m-0",
        ],
        [
          { intent: "secondary", size: undefined },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
        ],
        [
          { intent: "danger", size: "medium" },
          "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--warning-danger !border-red-500 button--warning-danger-medium",
        ],
        [
          { intent: "warning", size: "large" },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 m-0 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: true },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 m-0 button--warning-disabled text-black button--warning-danger !border-red-500",
        ],
        [
          { intent: "primary", m: 0 },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
        ],
        [
          { intent: "primary", m: 1 },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase",
        ],
        // !@TODO Add type "extractor" including class prop
        [
          {
            intent: "primary",
            m: 0,
            class: "adhoc-class",
          } as ButtonWithoutBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase adhoc-class",
        ],
        [
          {
            intent: "primary",
            m: 1,
            className: "adhoc-classname",
          } as ButtonWithoutBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase adhoc-classname",
        ],
      ])("button(%o)", (options, expected) => {
        it(`returns ${expected}`, () => {
          expect(buttonWithoutBaseWithDefaultsString(options)).toBe(expected)
          expect(
            buttonWithoutBaseWithDefaultsWithClassNameString(options),
          ).toBe(expected)
          expect(buttonWithoutBaseWithDefaultsArray(options)).toBe(expected)
          expect(buttonWithoutBaseWithDefaultsWithClassNameArray(options)).toBe(
            expected,
          )
        })
      })
    })
  })
  describe("with base", () => {
    describe("without defaults", () => {
      const buttonWithBaseWithoutDefaultsString = cvaWithBreakpoints(
        "button font-semibold border rounded",
        {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              class: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: "button--warning-danger-medium",
            },
          ],
        },
      )
      const buttonWithBaseWithoutDefaultsWithClassNameString =
        cvaWithBreakpoints("button font-semibold border rounded", {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              className: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: "button--warning-danger-medium",
            },
          ],
        })

      const buttonWithBaseWithoutDefaultsArray = cvaWithBreakpoints(
        ["button", "font-semibold", "border", "rounded"],
        {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              class: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: ["button--warning-danger", "!border-red-500"],
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: ["button--warning-danger-medium"],
            },
          ],
        },
      )
      const buttonWithBaseWithoutDefaultsWithClassNameArray =
        cvaWithBreakpoints(["button", "font-semibold", "border", "rounded"], {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              className: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: ["button--warning-danger", "!border-red-500"],
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: ["button--warning-danger-medium"],
            },
          ],
        })

      type ButtonWithBaseWithoutDefaultsProps =
        | VariantProps<typeof buttonWithBaseWithoutDefaultsString>
        | VariantProps<typeof buttonWithBaseWithoutDefaultsWithClassNameString>
        | VariantProps<typeof buttonWithBaseWithoutDefaultsArray>
        | VariantProps<typeof buttonWithBaseWithoutDefaultsWithClassNameArray>

      describe.each<[ButtonWithBaseWithoutDefaultsProps, string]>([
        [
          undefined as unknown as ButtonWithBaseWithoutDefaultsProps,
          "button font-semibold border rounded",
        ],
        [{}, "button font-semibold border rounded"],
        [
          {
            // @ts-expect-error
            aCheekyInvalidProp: "lol",
          },
          "button font-semibold border rounded",
        ],
        [
          { intent: "secondary" },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],

        [
          { size: "small" },
          "button font-semibold border rounded button--small text-sm py-1 px-2",
        ],
        [
          { disabled: false },
          "button font-semibold border rounded button--enabled cursor-pointer",
        ],
        [
          { disabled: true },
          "button font-semibold border rounded button--disabled opacity-050 cursor-not-allowed",
        ],
        [
          { intent: "secondary", size: null },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],
        [
          { intent: "secondary", size: undefined },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        ],
        [
          { intent: "danger", size: "medium" },
          "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
        ],
        [
          { intent: "warning", size: "large" },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: null },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: true },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: false },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
        ],
        // !@TODO Add type "extractor" including class prop
        [
          {
            intent: "primary",
            class: "adhoc-class",
          } as ButtonWithBaseWithoutDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-class",
        ],
        [
          {
            intent: "primary",
            className: "adhoc-className",
          } as ButtonWithBaseWithoutDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-className",
        ],
      ])("button(%o)", (options, expected) => {
        it(`returns ${expected}`, () => {
          expect(buttonWithBaseWithoutDefaultsString(options)).toBe(expected)
          expect(
            buttonWithBaseWithoutDefaultsWithClassNameString(options),
          ).toBe(expected)
          expect(buttonWithBaseWithoutDefaultsArray(options)).toBe(expected)
          expect(buttonWithBaseWithoutDefaultsWithClassNameArray(options)).toBe(
            expected,
          )
        })
      })
    })

    describe("with defaults", () => {
      const buttonWithBaseWithDefaultsString = cvaWithBreakpoints(
        "button font-semibold border rounded",
        {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              class: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: "button--warning-danger-medium",
            },
          ],
          defaultVariants: {
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )
      const buttonWithBaseWithDefaultsWithClassNameString = cvaWithBreakpoints(
        "button font-semibold border rounded",
        {
          variants: {
            intent: {
              primary:
                "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
              secondary:
                "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
              warning:
                "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: "button--disabled opacity-050 cursor-not-allowed",
              false: "button--enabled cursor-pointer",
            },
            size: {
              small: "button--small text-sm py-1 px-2",
              medium: "button--medium text-base py-2 px-4",
              large: "button--large text-lg py-2.5 px-4",
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: "button--primary-medium uppercase",
            },
            {
              intent: "warning",
              disabled: false,
              className: "button--warning-enabled text-gray-800",
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: "button--warning-danger !border-red-500",
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: "button--warning-danger-medium",
            },
          ],
          defaultVariants: {
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )

      const buttonWithBaseWithDefaultsArray = cvaWithBreakpoints(
        ["button", "font-semibold", "border", "rounded"],
        {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              class: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              class: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              class: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              class: ["button--warning-danger", "!border-red-500"],
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              class: ["button--warning-danger-medium"],
            },
          ],
          defaultVariants: {
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )
      const buttonWithBaseWithDefaultsWithClassNameArray = cvaWithBreakpoints(
        ["button", "font-semibold", "border", "rounded"],
        {
          variants: {
            intent: {
              primary: [
                "button--primary",
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "button--secondary",
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
              ],
              warning: [
                "button--warning",
                "bg-yellow-500",
                "border-transparent",
                "hover:bg-yellow-600",
              ],
              danger: [
                "button--danger",
                [
                  1 && "bg-red-500",
                  { baz: false, bat: null },
                  ["text-white", ["border-transparent"]],
                ],
                "hover:bg-red-600",
              ],
            },
            disabled: {
              true: ["button--disabled", "opacity-050", "cursor-not-allowed"],
              false: ["button--enabled", "cursor-pointer"],
            },
            size: {
              small: ["button--small", "text-sm", "py-1", "px-2"],
              medium: ["button--medium", "text-base", "py-2", "px-4"],
              large: ["button--large", "text-lg", "py-2.5", "px-4"],
            },
          },
          compoundVariants: [
            {
              intent: "primary",
              size: "medium",
              className: ["button--primary-medium", "uppercase"],
            },
            {
              intent: "warning",
              disabled: false,
              className: ["button--warning-enabled", "text-gray-800"],
            },
            {
              intent: "warning",
              disabled: true,
              className: [
                "button--warning-disabled",
                [1 && "text-black", { baz: false, bat: null }],
              ],
            },
            {
              intent: ["warning", "danger"],
              className: ["button--warning-danger", "!border-red-500"],
            },
            {
              intent: ["warning", "danger"],
              size: "medium",
              className: ["button--warning-danger-medium"],
            },
          ],
          defaultVariants: {
            disabled: false,
            intent: "primary",
            size: "medium",
          },
        },
      )

      type ButtonWithBaseWithDefaultsProps =
        | VariantProps<typeof buttonWithBaseWithDefaultsString>
        | VariantProps<typeof buttonWithBaseWithDefaultsWithClassNameString>
        | VariantProps<typeof buttonWithBaseWithDefaultsArray>
        | VariantProps<typeof buttonWithBaseWithDefaultsWithClassNameArray>

      describe.each<[ButtonWithBaseWithDefaultsProps, string]>([
        [
          // @ts-expect-error
          undefined,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          {},
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          {
            aCheekyInvalidProp: "lol",
          } as ButtonWithBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          { intent: "secondary" },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
        ],

        [
          { size: "small" },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2",
        ],
        [
          { disabled: null },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          { disabled: false },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          { disabled: true },
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 button--primary-medium uppercase",
        ],
        [
          { intent: "secondary", size: null },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer",
        ],
        [
          { intent: "secondary", size: undefined },
          "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
        ],
        [
          { intent: "danger", size: "medium" },
          "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
        ],
        [
          { intent: "warning", size: "large" },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
        ],
        [
          {
            intent: "warning",
            size: "large",
            disabled: null,
          },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: true },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
        ],
        [
          { intent: "warning", size: "large", disabled: false },
          "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
        ],
        // !@TODO Add type "extractor" including class prop
        [
          {
            intent: "primary",
            class: "adhoc-class",
          } as ButtonWithBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-class",
        ],
        [
          {
            intent: "primary",
            className: "adhoc-classname",
          } as ButtonWithBaseWithDefaultsProps,
          "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-classname",
        ],
      ])("button(%o)", (options, expected) => {
        it(`returns ${expected}`, () => {
          expect(buttonWithBaseWithDefaultsString(options)).toBe(expected)
          expect(buttonWithBaseWithDefaultsWithClassNameString(options)).toBe(
            expected,
          )
          expect(buttonWithBaseWithDefaultsArray(options)).toBe(expected)
          expect(buttonWithBaseWithDefaultsWithClassNameArray(options)).toBe(
            expected,
          )
        })
      })
    })
  })
  describe("composing classes", () => {
    type BoxProps = VariantProps<typeof box>
    const box = cvaWithBreakpoints(["box", "box-border"], {
      variants: {
        margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
        padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
      },
      defaultVariants: {
        margin: 0,
        padding: 0,
      },
    })

    type CardBaseProps = VariantProps<typeof cardBase>
    const cardBase = cvaWithBreakpoints(
      ["card", "border-solid", "border-slate-300", "rounded"],
      {
        variants: {
          shadow: {
            md: "drop-shadow-md",
            lg: "drop-shadow-lg",
            xl: "drop-shadow-xl",
          },
        },
      },
    )

    interface CardProps extends BoxProps, CardBaseProps {}
    const card = ({ margin, padding, shadow }: CardProps = {}) =>
      clsx(box({ margin, padding }), cardBase({ shadow }))

    describe.each<[CardProps, string]>([
      [
        // @ts-expect-error
        undefined,
        "box box-border m-0 p-0 card border-solid border-slate-300 rounded",
      ],
      [{}, "box box-border m-0 p-0 card border-solid border-slate-300 rounded"],
      [
        { margin: 4 },
        "box box-border m-4 p-0 card border-solid border-slate-300 rounded",
      ],
      [
        { padding: 4 },
        "box box-border m-0 p-4 card border-solid border-slate-300 rounded",
      ],
      [
        { margin: 2, padding: 4 },
        "box box-border m-2 p-4 card border-solid border-slate-300 rounded",
      ],
      [
        { shadow: "md" },
        "box box-border m-0 p-0 card border-solid border-slate-300 rounded drop-shadow-md",
      ],
    ])("card(%o)", (options, expected) => {
      it(`returns ${expected}`, () => {
        expect(card(options)).toBe(expected)
      })
    })
  })
})
