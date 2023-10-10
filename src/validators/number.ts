import { validate } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator";

export type NumberValidatorPrecisionArg = ["", `${number}.` | `.${number}` | `${number}.${number}`];
export type NumberValidatorRangeArg = ["", `${number}~` | `~${number}` | `${number}~${number}`];
export type NumberValidatorExpression1 = ValidatorExpression<"number", [NumberValidatorPrecisionArg, NumberValidatorRangeArg]>;
export type NumberValidatorExpression2 = ValidatorExpression<"number", [NumberValidatorRangeArg, NumberValidatorPrecisionArg]>;
export type NumberValidatorExpression = NumberValidatorExpression1 | NumberValidatorExpression2;

export interface NumberValidatorOptions {}

export const numberValidator = createValidator<NumberValidatorExpression, NumberValidatorOptions>({
  validate(context) {
    return validate({
      context,
      transform: (value) => {
        if (typeof value === "number") return value;
        if (typeof value === "string") return Number(value);
        return value;
      },
      typeValidate: (value) => typeof value === "number" && !Number.isNaN(value),
      argsValidate: (value) => {
        const { $1, $2 } = context.parse.args ?? {};

        if (!$1 && !$2) return { type: "valid", value };

        if ($1?.includes(".") || $2?.includes(".")) {
          const [integerLength, decimalLength] = ($1?.includes(".") ? $1 : $2).split(".");
          const [integer, decimal = ""] = String(value).split(".");
          if (integerLength && decimalLength && (integer.length > +integerLength || decimal.length > +decimalLength)) {
            return { type: "invalid", comment: context.parse.comment };
          }
          if (integerLength && !decimalLength && integer.length > +integerLength) {
            return { type: "invalid", comment: context.parse.comment };
          }
          if (!integerLength && decimalLength && decimal.length > +decimalLength) {
            return { type: "invalid", comment: context.parse.comment };
          }
        }

        if ($1?.includes("~") || $2?.includes("~")) {
          const [min, max] = ($1?.includes("~") ? $1 : $2).split("~");
          if (min && max && (value < +min || value > +max)) {
            return { type: "invalid", comment: context.parse.comment };
          }
          if (min && !max && value < +min) {
            return { type: "invalid", comment: context.parse.comment };
          }
          if (!min && max && value > +max) {
            return { type: "invalid", comment: context.parse.comment };
          }
        }

        return { type: "valid", value };
      },
    });
  },
});
