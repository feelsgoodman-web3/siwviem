import { describe, expect, it } from "vitest"
import light from "../../themes/defaultTheme/colors/light"
import mapColorRamp from "../mapColorRamp"

describe("Map color ramp", () => {
  it("Should output color ramp for accent", () => {
    const ramp = mapColorRamp("accent", light.accent)
    expect(ramp).toEqual({
      "--accent-1": "hsl(151, 60%, 99%)",
      "--accent-2": "hsl(150, 77.8%, 96.5%)",
      "--accent-3": "hsl(151, 65.9%, 93.7%)",
      "--accent-4": "hsl(152, 56.5%, 90%)",
      "--accent-5": "hsl(154, 49.1%, 85%)",
      "--accent-6": "hsl(156, 43.5%, 78.3%)",
      "--accent-7": "hsl(159, 40.2%, 68.7%)",
      "--accent-8": "hsl(164, 42%, 53.3%)",
      "--accent-9": "hsl(164, 60%, 40%)",
      "--accent-10": "hsl(164, 60.8%, 36.7%)",
      "--accent-11": "hsl(163, 65%, 28.9%)",
      "--accent-12": "hsl(160, 34%, 17.2%)",
      "--accent-9-contrast": "white",
      "--accent-surface": "var(--accent-a2)",
    })
  })
  it("Should output color ramp for accent alpha", () => {
    const ramp = mapColorRamp("accent", light["accent-a"], true)
    expect(ramp).toEqual({
      "--accent-a1": "hsla(160, 94.9%, 38.7%, 0.016)",
      "--accent-a2": "hsla(150, 99.1%, 44%, 0.063)",
      "--accent-a3": "hsla(150, 99.7%, 40.8%, 0.106)",
      "--accent-a4": "hsla(151, 99.8%, 36.3%, 0.157)",
      "--accent-a5": "hsla(153, 99.4%, 33.5%, 0.224)",
      "--accent-a6": "hsla(155, 99.8%, 30.4%, 0.31)",
      "--accent-a7": "hsla(159, 99.4%, 28.7%, 0.44)",
      "--accent-a8": "hsla(164, 99.9%, 29.6%, 0.663)",
      "--accent-a9": "hsla(164, 99.7%, 28.6%, 0.84)",
      "--accent-a10": "hsla(164, 100%, 25.9%, 0.855)",
      "--accent-a11": "hsla(163, 99.5%, 21%, 0.899)",
      "--accent-a12": "hsla(160, 98.8%, 6.7%, 0.887)",
    })
  })
})
