import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NestedObjectValidatorExpression } from "./object";
import { StringValidatorExpression } from "./string";
import { TupleValidatorExpression } from "./tuple";
import { UnionValidatorExpression } from "./union";

export type AnyValidatorExpression =
  | StringValidatorExpression
  | NumberValidatorExpression
  | BooleanValidatorExpression
  | DateValidatorExpression
  | TupleValidatorExpression
  | UnionValidatorExpression
  | NestedObjectValidatorExpression;

export const anyValidator = createValidator<AnyValidatorExpression>({
  validate(context) {},
});
