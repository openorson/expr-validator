import { ValidatorExpression } from "../types/expression";
import { StringExpressionParse, ValidateInvalidResult, ValidateValidResult } from "../types/validator";
import { createValidator } from "../validator/validator";

export type NumberValidatorPrecisionArg = ["", `${number}.` | `.${number}` | `${number}.${number}`];
export type NumberValidatorRangeArg = ["", `${number}~` | `~${number}` | `${number}~${number}`];
export type NumberValidatorExpression1 = ValidatorExpression<"number", [NumberValidatorPrecisionArg, NumberValidatorRangeArg]>;
export type NumberValidatorExpression2 = ValidatorExpression<"number", [NumberValidatorRangeArg, NumberValidatorPrecisionArg]>;
export type NumberValidatorExpression = NumberValidatorExpression1 | NumberValidatorExpression2;

export interface NumberValidatorOptions {}

export const numberValidator = createValidator<NumberValidatorExpression, NumberValidatorOptions>({
  validate({ value: val, parse, transform }) {
    let value = val;

    if (parse.optional) {
      if (value === null || value === void 0) return { type: "valid", value };
    } else {
      if (value === null || value === void 0) return { type: "invalid" };
    }

    if (parse.each) {
      if (!Array.isArray(value)) return { type: "invalid" };

      for (let index = 0; index < value.length; index++) {
        let item = value[index];

        if (transform) {
          if (typeof item === "string") {
            const number = Number(item);
            if (Number.isNaN(number)) {
              return { type: "invalid" };
            } else {
              item = number;
            }
          }
        }

        if (Number.isNaN(item)) return { type: "invalid" };

        if (typeof item === "number") {
          const result = numberArgsValidate(parse, item);
          if (result.type === "invalid") return result;
          value[index] = item;
        } else {
          return { type: "invalid" };
        }
      }

      return { type: "valid", value };
    } else {
      if (transform) {
        if (typeof value === "string") {
          const number = Number(value);
          if (Number.isNaN(number)) {
            return { type: "invalid" };
          } else {
            value = number;
            return { type: "valid", value };
          }
        }
      }

      if (Number.isNaN(value)) return { type: "invalid" };

      if (typeof value === "number") {
        return numberArgsValidate(parse, value);
      } else {
        return { type: "invalid" };
      }
    }
  },
});

function numberArgsValidate(parse: StringExpressionParse, value: number): ValidateInvalidResult | ValidateValidResult {
  const { $1, $2 } = parse.args ?? {};

  if (!$1 && !$2) return { type: "valid", value };

  if ($1?.includes(".") || $2?.includes(".")) {
    const [integerLength, decimalLength] = ($1?.includes(".") ? $1 : $2).split(".");
    const [integer, decimal = ""] = String(value).split(".");
    if (integerLength && decimalLength && (integer.length > +integerLength || decimal.length > +decimalLength)) {
      return { type: "invalid", comment: parse.comment };
    }
    if (integerLength && !decimalLength && integer.length > +integerLength) {
      return { type: "invalid", comment: parse.comment };
    }
    if (!integerLength && decimalLength && decimal.length > +decimalLength) {
      return { type: "invalid", comment: parse.comment };
    }
  }

  if ($1?.includes("~") || $2?.includes("~")) {
    const [min, max] = ($1?.includes("~") ? $1 : $2).split("~");
    if (min && max && (value < +min || value > +max)) {
      return { type: "invalid", comment: parse.comment };
    }
    if (min && !max && value < +min) {
      return { type: "invalid", comment: parse.comment };
    }
    if (!min && max && value > +max) {
      return { type: "invalid", comment: parse.comment };
    }
  }

  return { type: "valid", value };
}
