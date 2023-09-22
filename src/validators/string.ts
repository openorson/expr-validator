import { typeOf, typer } from "../common";
import { validationErrorMessage } from "../error";
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
      return validationErrorMessage({
        comment: parse.comment,
        type: "类型",
        expect: "string",
        actual: typeOf(value),
        value,
      });
    }

    const { $ } = parse.args ?? {};

    if (!$) {
      if (value.length < 1 || value.length >= 256) {
        return validationErrorMessage({
          comment: parse.comment,
          type: "长度",
          expect: "[1,256)",
          actual: value.length,
          value,
        });
      }
    } else {
      if ($.indexOf("/") === 0) {
        const reg = new RegExp($.slice(1, $.length - 1));
        if (!reg.test(value)) {
          return "不符合正则";
        }
      }

      const range = $.split("-");
      if (range.length === 1) {
        if (Number.isNaN(+range[0])) {
          if (!pattern[range[0] as keyof typeof pattern]?.test(value)) {
            return "不符合正则";
          }
        } else {
          if (value.length < +range[0]) {
            return "不符合范围";
          }
        }
      } else {
        if (value.length < +range[0] || value.length >= +range[1]) {
          return "不符合范围";
        }
      }
    }
  },
  parse(value: unknown) {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    return value;
  },
});
