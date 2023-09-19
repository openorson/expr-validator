import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type StringValidatorFormatArg = ["", `/${string}/` | `${number}` | `${number}-${number}`];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg, ["size", string]]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate(context) {
    return true;
  },
  parse() {},
});
