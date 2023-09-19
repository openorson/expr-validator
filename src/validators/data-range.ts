import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateRangeValidatorExpression = ValidatorExpression<"dateRange", []>;

export interface DateRangeValidatorOptions {}

export const dateRangeValidator = createValidator<DateRangeValidatorExpression, DateRangeValidatorOptions>({
  validate(context) {},
});
