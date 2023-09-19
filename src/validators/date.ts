import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateValidatorExpression = ValidatorExpression<"date", []>;

export interface DateValidatorOptions {}

export const dateValidator = createValidator<DateValidatorExpression, DateValidatorOptions>({
  validate(context) {},
});
