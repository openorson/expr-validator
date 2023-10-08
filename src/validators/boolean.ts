import { typeCheck } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export interface BooleanValidatorOptions {}

export const booleanValidator = createValidator<BooleanValidatorExpression, BooleanValidatorOptions>({
  validate({ value: val, parse, transform }) {
    let value = val;
    if (transform) {
      if (!(value === null || value === void 0)) value = !!value;
    }

    if (!typeCheck<boolean>(value, parse, (v) => typeof v === "boolean")) {
      return { type: "invalid", comment: parse.comment };
    }

    return { type: "valid", value };
  },
});
