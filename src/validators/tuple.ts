import { ValidatorArrayExpressionTupleMode } from "../types/expression";
import { ValidateInvalidResult, ValidateValidResult } from "../types/validator";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression, booleanValidator } from "./boolean";
import { DateValidatorExpression, dateValidator } from "./date";
import { NumberValidatorExpression, numberValidator } from "./number";
import { StringValidatorExpression, stringValidator } from "./string";

export type TupleValidatorExpression = readonly [
  ValidatorArrayExpressionTupleMode,
  ...(readonly (StringValidatorExpression | NumberValidatorExpression | BooleanValidatorExpression | DateValidatorExpression)[])
];

export interface TupleValidatorOptions {}

export const tupleValidator = createValidator<TupleValidatorExpression, TupleValidatorOptions>({
  validate(context) {
    const [_1, ...tupleExpression] = context.expression;
    const [_2, ...tupleParse] = context.parse;

    if (!Array.isArray(context.value) || context.value.length !== tupleExpression.length) {
      return { type: "invalid" };
    }

    const value = [...context.value];

    let index = 0;
    while (index < tupleExpression.length) {
      const expression = tupleExpression[index];
      const parse = tupleParse[index];

      let result: ValidateInvalidResult | ValidateValidResult;

      if (parse.type === "string") {
        result = stringValidator.$options.validate({
          value: context.value[index],
          parse,
          transform: context.transform,
          expression: expression as StringValidatorExpression,
        });
      }

      if (parse.type === "number") {
        result = numberValidator.$options.validate({
          value: context.value[index],
          parse,
          transform: context.transform,
          expression: expression as NumberValidatorExpression,
        });
      }

      if (parse.type === "boolean") {
        result = booleanValidator.$options.validate({
          value: context.value[index],
          parse,
          transform: context.transform,
          expression: expression as BooleanValidatorExpression,
        });
      }

      if (parse.type === "date") {
        result = dateValidator.$options.validate({
          value: context.value[index],
          parse,
          transform: context.transform,
          expression: expression as DateValidatorExpression,
        });
      }

      if (result!) {
        if (result.type === "invalid") return result;
        value[index] = result.value;
      }

      index++;
    }

    return { type: "valid", value };
  },
});
