import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type DateRangeValidatorExpression = ValidatorExpression<"dateRange", []>;

export const dateRangeValidator = createValidator<DateRangeValidatorExpression>({
  validate(context) {},
});
