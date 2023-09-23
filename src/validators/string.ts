import { typeOf, typer } from "../common";
import { ValidationError } from "../error";
import { pattern } from "../pattern";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type StringValidatorPattern = keyof typeof pattern;
export type StringValidatorFormatArg = ["", `/${string}/` | `${number}~` | `~${number}` | `${number}~${number}` | StringValidatorPattern];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<string>(value, parse, (v) => typeof v === "string")) {
      return ValidationError.message({ comment: parse.comment, type: "类型", expect: "string", actual: typeOf(value), value });
    }

    const { $ } = parse.args ?? {};

    if (!$) {
      if (value.length < 1 || value.length > 256) {
        return ValidationError.message({ comment: parse.comment, type: "长度", expect: "1~256", actual: value.length, value });
      }
    } else {
      if ($.indexOf("/") === 0) {
        const reg = new RegExp($.slice(1, $.length - 1));
        if (!reg.test(value)) {
          return ValidationError.message({ comment: parse.comment, type: "格式", expect: reg, value });
        }
      } else if ($.includes("~")) {
        const [start, end] = $.split("~");
        if (start && end && (value.length < +start || value.length > +end)) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `${start}~${end}`, actual: value.length, value });
        }
        if (start && !end && value.length < +start) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `>=${start}`, actual: value.length, value });
        }
        if (!start && end && value.length > +end) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `<${end}`, actual: value.length, value });
        }
      } else {
        if (!pattern[$ as keyof typeof pattern][1].test(value)) {
          return ValidationError.message({ comment: parse.comment, type: "格式", expect: pattern[$ as keyof typeof pattern][0], value });
        }
      }
    }
  },
  parse(value: unknown) {
    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return String(value);
    return value;
  },
});
