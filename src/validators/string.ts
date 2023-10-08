import { typeCheck } from "../common";
import { pattern } from "../pattern";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type StringValidatorPattern = keyof typeof pattern;
export type StringValidatorArg = ["", `/${string}/` | `${number}~` | `~${number}` | `${number}~${number}` | StringValidatorPattern];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorArg]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate({ value: val, parse, transform }) {
    let value = val;
    if (transform) {
      if (typeof value === "string") value = value.trim();
      if (typeof value === "number") value = String(value);
    }

    if (!typeCheck<string>(value, parse, (v) => typeof v === "string")) {
      return { type: "invalid", comment: parse.comment };
    }

    const { $1 } = parse.args ?? {};

    if (!$1) {
      if (value.length < 1 || value.length > 256) {
        return { type: "invalid", comment: parse.comment };
      }
    } else {
      if ($1.includes("/")) {
        const reg = new RegExp($1.slice(1, $1.length - 1));
        if (!reg.test(value)) {
          return { type: "invalid", comment: parse.comment };
        }
      } else if ($1.includes("~")) {
        const [min, max] = $1.split("~");
        if (min && max && (value.length < +min || value.length > +max)) {
          return { type: "invalid", comment: parse.comment };
        }
        if (min && !max && value.length < +min) {
          return { type: "invalid", comment: parse.comment };
        }
        if (!min && max && value.length > +max) {
          return { type: "invalid", comment: parse.comment };
        }
      } else {
        if (!pattern[$1 as keyof typeof pattern].test(value)) {
          return { type: "invalid", comment: parse.comment };
        }
      }
    }

    return { type: "valid", value };
  },
});
