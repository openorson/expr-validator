import { createValidator } from "../validator";
import { AnyValidatorExpression } from "./any";

export type UnionValidatorExpression = readonly AnyValidatorExpression[];

export const unionValidator = createValidator<UnionValidatorExpression, "union">({
  arrayMode: "union",
  validate(context) {},
});
