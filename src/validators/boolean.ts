import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export interface BooleanValidatorOptions {}

export const booleanValidator = createValidator<BooleanValidatorExpression, BooleanValidatorOptions>({
  validate(context) {},
});
