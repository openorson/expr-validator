import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type StringValidatorFormatArg = ["", `/${string}/` | `${number}` | `${number}-${number}`];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export const stringValidator = createValidator<StringValidatorExpression>({
  validate(context) {
    return true;
  },
  parse() {},
});
