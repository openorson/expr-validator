import { validate } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export interface BooleanValidatorOptions {}

export const booleanValidator = createValidator<BooleanValidatorExpression, BooleanValidatorOptions>({
  validate(context) {
    return validate({
      context,
      transform: (value) => !!value,
      typeValidate: (value) => typeof value === "boolean",
    });
  },
});
