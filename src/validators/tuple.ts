import { ValidatorArrayExpressionTupleMode } from "../types/expression";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateRangeValidatorExpression } from "./data-range";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NumberRangeValidatorExpression } from "./number-range";
import { StringValidatorExpression } from "./string";

export type TupleValidatorExpression = readonly [
  ValidatorArrayExpressionTupleMode,
  ...(readonly (
    | StringValidatorExpression
    | NumberValidatorExpression
    | NumberRangeValidatorExpression
    | BooleanValidatorExpression
    | DateValidatorExpression
    | DateRangeValidatorExpression
  )[])
];

export interface TupleValidatorOptions {}

export const tupleValidator = createValidator<TupleValidatorExpression, TupleValidatorOptions>({
  validate(context) {
    return true;
  },
});
