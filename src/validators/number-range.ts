import { typeOf, typer } from "../common";
import { ValidationError } from "../error";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";
import { NumberValidatorPrecisionArg, NumberValidatorRangeArg } from "./number";

export type NumberRangeValidatorExpression1 = ValidatorExpression<"numberRange", [NumberValidatorPrecisionArg, NumberValidatorRangeArg]>;
export type NumberRangeValidatorExpression2 = ValidatorExpression<"numberRange", [NumberValidatorRangeArg, NumberValidatorPrecisionArg]>;
export type NumberRangeValidatorExpression = NumberRangeValidatorExpression1 | NumberRangeValidatorExpression2;

export interface NumberRangeValidatorOptions {}

export const numberRangeValidator = createValidator<NumberRangeValidatorExpression, NumberRangeValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<[number, number]>(value, parse, (v) => Array.isArray(v) && v.every((i) => typeof i === "number"), true)) {
      return ValidationError.message({ comment: parse.comment, type: "类型", expect: "[number, number]", actual: typeOf(value) });
    }
  },
});
