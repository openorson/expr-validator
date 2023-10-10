import { validate } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type DateValidatorExpression = ValidatorExpression<"date", []>;

export interface DateValidatorOptions {}

export const dateValidator = createValidator<DateValidatorExpression, DateValidatorOptions>({
  validate(context) {
    return validate({
      context,
      transform: (value) => {
        if (Object.prototype.toString.call(value) !== "[object Date]") {
          // @ts-ignore
          value = Array.isArray(value) ? new Date(...value) : new Date(value);
        }
      },
      typeValidate: (value) => Object.prototype.toString.call(value) === "[object Date]" && !Number.isNaN((value as Date).getTime()),
    });
  },
});
