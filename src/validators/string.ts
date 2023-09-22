import { typer } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

// prettier-ignore
const regs = {
  /** 邮箱(支付中文) */
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  /** 移动电话号码 */
  mobilePhone: /^(?:(?:\+|00)86)?1\d{10}$/,
  /** 固定电话号码 */
  telPhone: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
  /** 身份证号码 */
  idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
};

export type StringValidatorRegularFormat = keyof typeof regs;
export type StringValidatorFormatArg = ["", `/${string}/` | `${number}` | `${number}-${number}` | StringValidatorRegularFormat];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorFormatArg]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<string>(value, parse, (v) => typeof v === "string")) return;

    const { $ } = parse.args ?? {};

    if (!$) return value.length >= 1 && value.length < 256;

    if ($.indexOf("/") === 0) {
      const reg = new RegExp($.slice(1, $.length - 1));
      return reg.test(value);
    }

    const range = $.split("-");
    if (range.length === 1) {
      if (Number.isNaN(+range[0])) {
        return regs[range[0] as keyof typeof regs]?.test(value);
      } else {
        return value.length >= +range[0];
      }
    } else {
      return value.length >= +range[0] && value.length < +range[1];
    }
  },
  parse() {},
});
