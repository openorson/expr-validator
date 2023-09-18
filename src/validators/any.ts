import { createValidator } from "../validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateRangeValidatorExpression } from "./data-range";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NumberRangeValidatorExpression } from "./number-range";
import { StringValidatorExpression } from "./string";
import { TupleValidatorExpression } from "./tuple";
import { UnionValidatorExpression } from "./union";

export type AnyValidatorExpression =
  | StringValidatorExpression
  | NumberValidatorExpression
  | NumberRangeValidatorExpression
  | BooleanValidatorExpression
  | DateValidatorExpression
  | DateRangeValidatorExpression
  | TupleValidatorExpression
  | UnionValidatorExpression;

export const anyValidator = createValidator<AnyValidatorExpression>({
  validate(context) {},
});

anyValidator("", ["boolean!", "number!"]);
