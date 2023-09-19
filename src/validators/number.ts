import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type NumberValidatorFormatArg = ["", `/${string}/` | `${number}` | `${number}-${number}`];
export type NumberValidatorExpression = ValidatorExpression<"number", [NumberValidatorFormatArg]>;

export interface NumberValidatorOptions {}

export const numberValidator = createValidator<NumberValidatorExpression, NumberValidatorOptions>({
  validate(context) {},
});
