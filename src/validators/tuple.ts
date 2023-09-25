import { ValidatorArrayExpressionTupleMode } from "../types/expression";
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
  validate({ expression, value, parse }) {
    const [_1, ...tupleExpression] = expression;
    const [_2, ...tupleParse] = parse;

    if (!Array.isArray(value) || value.length !== tupleExpression.length) {
      return { type: "invalid" };
    }

    let index = 0;
    while (index < tupleExpression.length) {
      const expression = tupleExpression[index];
      const parse = tupleParse[index];

      if (parse.type === "string") {
        const valid = stringValidator.$options.validate({ value: value[index], parse, expression: expression as StringValidatorExpression });
        if (valid) return valid;
      }
      if (parse.type === "number") {
        const valid = numberValidator.$options.validate({ value: value[index], parse, expression: expression as NumberValidatorExpression });
        if (valid) return valid;
      }
      if (parse.type === "boolean") {
        const valid = booleanValidator.$options.validate({ value: value[index], parse, expression: expression as BooleanValidatorExpression });
        if (valid) return valid;
      }
      if (parse.type === "date") {
        const valid = dateValidator.$options.validate({ value: value[index], parse, expression: expression as DateValidatorExpression });
        if (valid) return valid;
      }

      index++;
    }
  },
  parse({ expression, value, parse }) {
    const [_1, ...tupleExpression] = expression;
    const [_2, ...tupleParse] = parse;

    if (!Array.isArray(value) || value.length !== tupleExpression.length) return value;

    const parseValue = [...value];

    let index = 0;
    while (index < tupleExpression.length) {
      const expression = tupleExpression[index];
      const parse = tupleParse[index];

      if (parse.type === "string" && stringValidator.$options.parse) {
        parseValue[index] = stringValidator.$options.parse({ value: value[index], parse, expression: expression as StringValidatorExpression });
      }
      if (parse.type === "number" && numberValidator.$options.parse) {
        parseValue[index] = numberValidator.$options.parse({ value: value[index], parse, expression: expression as NumberValidatorExpression });
      }
      if (parse.type === "boolean" && booleanValidator.$options.parse) {
        parseValue[index] = booleanValidator.$options.parse({ value: value[index], parse, expression: expression as BooleanValidatorExpression });
      }
      if (parse.type === "date" && dateValidator.$options.parse) {
        parseValue[index] = dateValidator.$options.parse({ value: value[index], parse, expression: expression as DateValidatorExpression });
      }

      index++;
    }

    return parseValue;
  },
});
