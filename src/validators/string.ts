import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type StringValidatorFormatArg = [
  "format" | "",
  `/${string}/` | "email" | "phoneNumber" | "mongoId" | "uuid" | "url" | "ip"
];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export const stringValidator = createValidator<StringValidatorExpression>({
  validate(context) {
    return true;
  },
});
