import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateRangeValidatorExpression = ValidatorExpression<"dateRange", []>;

export const dateRangeValidator = createValidator<DateRangeValidatorExpression>({
  validate(context) {},
});
