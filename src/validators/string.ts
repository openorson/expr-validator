import { typeOf, typer } from "../common";
import { ValidationError } from "../error";
import { pattern } from "../pattern";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type StringValidatorPattern = keyof typeof pattern;
export type StringValidatorArg = ["", `/${string}/` | `${number}~` | `~${number}` | `${number}~${number}` | StringValidatorPattern];
export type StringValidatorExpression = ValidatorExpression<"string", [StringValidatorArg]>;

export interface StringValidatorOptions {}

export const stringValidator = createValidator<StringValidatorExpression, StringValidatorOptions>({
  validate({ value, parse }) {
    if (!typer<string>(value, parse, (v) => typeof v === "string")) {
      return ValidationError.message({ comment: parse.comment, type: "类型", expect: "string", actual: typeOf(value) });
    }

    const { $1 } = parse.args ?? {};

    if (!$1) {
      if (value.length < 1 || value.length > 256) {
        return ValidationError.message({ comment: parse.comment, type: "长度", expect: "1~256", actual: value.length });
      }
    } else {
      if ($1.includes("/")) {
        const reg = new RegExp($1.slice(1, $1.length - 1));
        if (!reg.test(value)) {
          return ValidationError.message({ comment: parse.comment, type: "格式", expect: reg });
        }
      } else if ($1.includes("~")) {
        const [min, max] = $1.split("~");
        if (min && max && (value.length < +min || value.length > +max)) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `${min}~${max}`, actual: value.length });
        }
        if (min && !max && value.length < +min) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `>=${min}`, actual: value.length });
        }
        if (!min && max && value.length > +max) {
          return ValidationError.message({ comment: parse.comment, type: "长度", expect: `<${max}`, actual: value.length });
        }
      } else {
        if (!pattern[$1 as keyof typeof pattern][1].test(value)) {
          return ValidationError.message({ comment: parse.comment, type: "格式", expect: pattern[$1 as keyof typeof pattern][0] });
        }
      }
    }
  },
  parse(value) {
    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return String(value);
    return value;
  },
});
