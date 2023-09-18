import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export const booleanValidator = createValidator<BooleanValidatorExpression>({
  validate(context) {},
});
