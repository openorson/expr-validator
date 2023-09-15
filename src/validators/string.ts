import { createValidator } from "..";
import { ValidatorExpression } from "../types/expression";

export type StringValidatorFormatArg = ["format" | "", "email" | "phoneNumber" | "mongoId" | "url" | "ip"];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export const stringValidator = createValidator<StringValidatorExpression>({
  validate(context) {},
});

stringValidator("string!", "");
