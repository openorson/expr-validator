import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type NumberRangeValidatorFormatArg = ["format" | "", "currency" | "timestamp"];
export type NumberRangeValidatorExpression = ValidatorExpression<"numberRange", [NumberRangeValidatorFormatArg]>;

export interface NumberRangeValidatorOptions {}

export const numberRangeValidator = createValidator<NumberRangeValidatorExpression, NumberRangeValidatorOptions>({
  validate(context) {},
});
