import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type BooleanValidatorExpression = ValidatorExpression<"boolean", []>;

export interface BooleanValidatorOptions {}

export const booleanValidator = createValidator<BooleanValidatorExpression, BooleanValidatorOptions>({
  validate({ value: val, parse, transform }) {
    let value = val;

    if (parse.optional) {
      if (value === null || value === void 0) return { type: "valid", value };
    } else {
      if (value === null || value === void 0) return { type: "invalid" };
    }

    if (parse.each) {
      if (!Array.isArray(value)) return { type: "invalid" };
      if (transform) {
        value = value.map((item) => !!item);
        return { type: "valid", value };
      }
      if ((value as any[]).some((item) => typeof item !== "boolean")) {
        return { type: "invalid" };
      } else {
        return { type: "valid", value };
      }
    } else {
      if (transform) {
        value = !!value;
        return { type: "valid", value };
      }
      if (typeof value === "boolean") {
        return { type: "valid", value };
      } else {
        return { type: "invalid" };
      }
    }
  },
});
