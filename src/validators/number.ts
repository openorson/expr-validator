import { typeCheck } from "../common";
import { ValidatorExpression } from "../types/expression";
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
    if (transform) {
      if (typeof value === "string") {
        const number = Number(value);
        if (!Number.isNaN(number)) value = number;
      }
    }

    if (!typeCheck<number>(value, parse, (v) => typeof v === "number")) {
      return { type: "invalid", comment: parse.comment };
    }

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
  },
});
