import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type NumberRangeValidatorFormatArg = ["format" | "", "currency" | "timestamp"];
export type NumberRangeValidatorExpression = ValidatorExpression<"numberRange", [NumberRangeValidatorFormatArg]>;

export const numberRangeValidator = createValidator<NumberRangeValidatorExpression>({
  validate(context) {},
});
