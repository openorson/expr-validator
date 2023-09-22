import { typer } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type NumberValidatorFormatArg = ["", `${number}~${number}` | `${number}.${number}`];
export type NumberValidatorExpression = ValidatorExpression<"number", [NumberValidatorFormatArg]>;

export interface NumberValidatorOptions {}

export const numberValidator = createValidator<NumberValidatorExpression, NumberValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<number>(value, parse, (v) => typeof v === "number")) {
      return "类型错误";
    }
  },
});
