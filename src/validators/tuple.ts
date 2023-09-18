import { createValidator } from "../validator";
import { AnyValidatorExpression } from "./any";

export type TupleValidatorExpression = readonly AnyValidatorExpression[];

export const tupleValidator = createValidator<TupleValidatorExpression, "tuple">({
  arrayMode: "tuple",
  validate(context) {},
});
