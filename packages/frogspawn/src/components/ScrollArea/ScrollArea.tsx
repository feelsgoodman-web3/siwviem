import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { ComponentPropsWithRef, type ElementRef, forwardRef } from "react"
import {
  MarginProps,
  extractMarginProps,
  withMarginProps,
} from "../../definitions"
import { GetPropDefTypes } from "../../definitions/types"
import { withBreakpoints } from "../../utils"
import { scrollbarPropDefs, scrollbarVariants } from "./variants"

type ScrollAreaElement = ElementRef<typeof ScrollAreaPrimitive.Viewport>
type ScrollAreaOwnProps = GetPropDefTypes<typeof scrollbarPropDefs>
type ScrollAreaVariantProps = VariantProps<typeof scrollbarVariants>

interface ScrollAreaProps
  extends ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>,
    Omit<ComponentPropsWithRef<typeof ScrollAreaPrimitive.Viewport>, "dir">,
    MarginProps,
    ScrollAreaOwnProps,
    ScrollAreaVariantProps {
  scrollbars?: "vertical" | "horizontal" | "both"
}

const ScrollArea = forwardRef<ScrollAreaElement, ScrollAreaProps>(
  (props, ref) => {
    const { marginProps, ...rest } = extractMarginProps(props)

    const {
      className,
      style,
      type,
      scrollHideDelay = type !== "scroll" ? 0 : undefined,
      scrollbars = "vertical",
      dir,
      size,
      radius,
      ...viewportProps
    } = rest

    return (
      <ScrollAreaPrimitive.Root
        type={type}
        scrollHideDelay={scrollHideDelay}
        className={clsx(
          "fs-ScrollAreaRoot",
          className,
          withMarginProps(marginProps),
        )}
        style={style}
      >
        <ScrollAreaPrimitive.Viewport
          {...viewportProps}
          ref={ref}
          className="fs-ScrollAreaViewport
          fs-w-full fs-h-full fs-overscroll-x-contain
          before:fs-absolute before:fs-inset-0 before:fs-pointer-events-none
          before:fs-outline before:fs-outline-2 before:-fs-outline-offset-2 before:fs-outline-accent-8"
        />
        {scrollbars !== "vertical" && (
          <ScrollAreaPrimitive.Scrollbar
            orientation="horizontal"
            className={clsx(
              "fs-ScrollAreaScrollbar",
              scrollbarVariants({ radius }),
              withBreakpoints("size", size),
            )}
          >
            <ScrollAreaPrimitive.Thumb className="fs-ScrollAreaThumb" />
          </ScrollAreaPrimitive.Scrollbar>
        )}
        {scrollbars !== "horizontal" && (
          <ScrollAreaPrimitive.Scrollbar
            data-radius={radius}
            orientation="vertical"
            className={clsx(
              "fs-ScrollAreaScrollbar",
              scrollbarVariants({ radius }),
              withBreakpoints("size", size),
            )}
          >
            <ScrollAreaPrimitive.Thumb className="fs-ScrollAreaThumb" />
          </ScrollAreaPrimitive.Scrollbar>
        )}
        {scrollbars === "both" && (
          <ScrollAreaPrimitive.Corner className="fs-ScrollAreaCorner" />
        )}
      </ScrollAreaPrimitive.Root>
    )
  },
)

ScrollArea.displayName = "ScrollArea"

export default ScrollArea
