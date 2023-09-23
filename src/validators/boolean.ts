import { typeCheck } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export interface BooleanValidatorOptions {}

export const booleanValidator = createValidator<BooleanValidatorExpression, BooleanValidatorOptions>({
  validate({ value, parse }) {
    if (!typeCheck<boolean>(value, parse, (v) => typeof v === "boolean")) {
      return { type: "invalid", comment: parse.comment };
    }
  },
  parse({ value }) {
    if (typeof value === "boolean") return value;
    return !!value;
  },
});
