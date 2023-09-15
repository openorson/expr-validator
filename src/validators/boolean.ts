import { createValidator } from "..";
import { ValidatorExpression } from "../types/expression";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export const booleanValidator = createValidator<BooleanValidatorExpression>({
  validate(context) {},
});
