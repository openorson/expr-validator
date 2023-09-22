import { typer } from "../common";
import { pattern } from "../pattern";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type StringValidatorPattern = keyof typeof pattern;
export type StringValidatorFormatArg = ["", `/${string}/` | `${number}` | `${number}-${number}` | StringValidatorPattern];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<string>(value, parse, (v) => typeof v === "string")) {
      return "类型错误";
    }

    const { $ } = parse.args ?? {};

    if (!$) {
      if (value.length < 1 || value.length >= 256) {
        return `值"${value}"长度需在1-256之间`;
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
