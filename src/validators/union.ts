import { ValidatorArrayExpressionUnionMode } from "../types/expression";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression, booleanValidator } from "./boolean";
import { DateValidatorExpression, dateValidator } from "./date";
import { NumberValidatorExpression, numberValidator } from "./number";
import { StringValidatorExpression, stringValidator } from "./string";

export type UnionValidatorExpression = readonly [
  ValidatorArrayExpressionUnionMode,
  ...(readonly (StringValidatorExpression | NumberValidatorExpression | BooleanValidatorExpression | DateValidatorExpression)[])
];

export interface UnionValidatorOptions {}

export const unionValidator = createValidator<UnionValidatorExpression, UnionValidatorOptions>({
  validate({ expression, value, parse }) {
    const [_1, ...unionExpression] = expression;
    const [_2, ...unionParse] = parse;

    let index = 0;
    while (index < unionExpression.length) {
      const expression = unionExpression[index];
      const parse = unionParse[index];

      if (parse.type === "string") {
        const valid = stringValidator.$options.validate({ value, parse, expression: expression as StringValidatorExpression });
        if (!valid) return;
      }
      if (parse.type === "number") {
        const valid = numberValidator.$options.validate({ value, parse, expression: expression as NumberValidatorExpression });
        if (!valid) return;
      }
      if (parse.type === "boolean") {
        const valid = booleanValidator.$options.validate({ value, parse, expression: expression as BooleanValidatorExpression });
        if (!valid) return;
      }
      if (parse.type === "date") {
        const valid = dateValidator.$options.validate({ value, parse, expression: expression as DateValidatorExpression });
        if (!valid) return;
      }

      index++;
    }

    return { type: "invalid" };
  },
});
