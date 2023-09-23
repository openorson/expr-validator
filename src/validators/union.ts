import { ValidatorArrayExpressionUnionMode } from "../types/expression";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { StringValidatorExpression } from "./string";

export type UnionValidatorExpression = readonly [
  ValidatorArrayExpressionUnionMode,
  ...(readonly (StringValidatorExpression | NumberValidatorExpression | BooleanValidatorExpression | DateValidatorExpression)[])
];

export interface UnionValidatorOptions {}

export const unionValidator = createValidator<UnionValidatorExpression, UnionValidatorOptions>({
  validate(context) {},
});
