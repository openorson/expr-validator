import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateValidatorExpression = ValidatorExpression<"date", []>;

export const dateValidator = createValidator<DateValidatorExpression>({
  validate(context) {},
});
