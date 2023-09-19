import { ValidatorArrayExpressionTupleMode, ValidatorArrayExpressionUnionMode } from "../types/expression";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateRangeValidatorExpression } from "./data-range";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NumberRangeValidatorExpression } from "./number-range";
import { NestedObjectValidatorExpression } from "./object";
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
  | [ValidatorArrayExpressionTupleMode, ...TupleValidatorExpression]
  | [ValidatorArrayExpressionUnionMode, ...UnionValidatorExpression]
  | NestedObjectValidatorExpression;

export const anyValidator = createValidator<AnyValidatorExpression>({
  validate(context) {},
});
