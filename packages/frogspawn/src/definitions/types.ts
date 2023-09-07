import type { ReactNode } from "react";
import type { Responsive } from "src/utils";
import { ComponentPropsWithRef, ElementType } from "react";

type BooleanPropDef = {
  type: "boolean";
  default?: boolean;
  required?: boolean;
};
type StringPropDef = { type: "string"; default?: string; required?: boolean };
type StringOrNumberPropDef = {
  type: "string | number";
  default?: string | number;
  required?: boolean;
};
type ReactNodePropDef = {
  type: "ReactNode";
  default?: ReactNode;
  required?: boolean;
};
type EnumPropDef<T> = {
  type: "enum";
  values: readonly T[];
  default?: T;
  required?: boolean;
};

type RegularPropDef<T> =
  | BooleanPropDef
  | StringPropDef
  | StringOrNumberPropDef
  | ReactNodePropDef
  | EnumPropDef<T>;
type ResponsivePropDef<T = any> = RegularPropDef<T> & { responsive: true };
type PropDef<T = any> = RegularPropDef<T> | ResponsivePropDef<T>;

type PropTypeFromDef<Def> = Def extends BooleanPropDef
  ? boolean
  : Def extends StringPropDef
  ? string
  : Def extends StringOrNumberPropDef
  ? string | number
  : Def extends ReactNodePropDef
  ? ReactNode
  : Def extends EnumPropDef<infer Type>
  ? Type
  : never;

type GetRegularPropDefType<Def> = PropTypeFromDef<Def>;

type GetResponsivePropDefType<Def> = Responsive<PropTypeFromDef<Def>>;

type GetPropDefType<Def> = Def extends { responsive: true }
  ? GetResponsivePropDefType<Def>
  : GetRegularPropDefType<Def>;

type GetPropDefTypes<P> = {
  [K in keyof P]?: GetPropDefType<P[K]>;
};

type PropsWithoutRefOrColor<T extends ElementType> = Omit<
  ComponentPropsWithRef<T>,
  "color"
>;

export type { PropDef, GetPropDefTypes, PropsWithoutRefOrColor };
