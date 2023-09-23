import { typeCheck } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateValidatorExpression = ValidatorExpression<"date", []>;

export interface DateValidatorOptions {}

export const dateValidator = createValidator<DateValidatorExpression, DateValidatorOptions>({
  validate({ value, parse }) {
    if (!typeCheck<Date>(value, parse, (v) => Object.prototype.toString.call(v) === "[object Date]" && !Number.isNaN((v as Date).getTime()))) {
      return { type: "invalid", comment: parse.comment };
    }
  },
  parse({ value }) {
    if (Object.prototype.toString.call(value) === "[object Date]") return value;
    // @ts-ignore
    return Array.isArray(value) ? new Date(...value) : new Date(value);
  },
});
