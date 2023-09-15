import { createValidator } from "..";
import { ValidatorExpression } from "../types/expression";

export type NumberValidatorFormatArg = ["format" | "", "currency" | "timestamp"];
export type NumberValidatorExpression = ValidatorExpression<"number", [NumberValidatorFormatArg]>;

export const numberValidator = createValidator<NumberValidatorExpression>({
  validate(context) {},
});
