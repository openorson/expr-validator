import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type NumberValidatorFormatArg = ["format" | "", "currency" | "timestamp"];
export type NumberValidatorExpression = ValidatorExpression<"number", [NumberValidatorFormatArg]>;

export const numberValidator = createValidator<NumberValidatorExpression>({
  validate(context) {},
});
