import { ValidatorArrayExpressionUnionMode } from "../types/expression";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateRangeValidatorExpression } from "./data-range";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NumberRangeValidatorExpression } from "./number-range";
import { StringValidatorExpression } from "./string";

export type UnionValidatorExpression = readonly [
  ValidatorArrayExpressionUnionMode,
  ...(readonly (
    | StringValidatorExpression
    | NumberValidatorExpression
    | NumberRangeValidatorExpression
    | BooleanValidatorExpression
    | DateValidatorExpression
    | DateRangeValidatorExpression
  )[])
];

export interface UnionValidatorOptions {}

export const unionValidator = createValidator<UnionValidatorExpression, UnionValidatorOptions>({
  validate(context) {},
});
