import { ValidatorArrayExpressionUnionMode } from "../types/expression";
import { ValidateInvalidResult, ValidateValidResult } from "../types/validator";
import { createValidator } from "../validator";
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
  validate(context) {
    const [_1, ...unionExpression] = context.expression;
    const [_2, ...unionParse] = context.parse;

    let index = 0;
    while (index < unionExpression.length) {
      const expression = unionExpression[index];
      const parse = unionParse[index];

      let result: ValidateInvalidResult | ValidateValidResult;

      if (parse.type === "string") {
        result = stringValidator.$options.validate({
          value: context.value,
          parse,
          transform: false,
          expression: expression as StringValidatorExpression,
        });
      }

      if (parse.type === "number") {
        result = numberValidator.$options.validate({
          value: context.value,
          parse,
          transform: false,
          expression: expression as NumberValidatorExpression,
        });
      }

      if (parse.type === "boolean") {
        result = booleanValidator.$options.validate({
          value: context.value,
          parse,
          transform: false,
          expression: expression as BooleanValidatorExpression,
        });
      }

      if (parse.type === "date") {
        result = dateValidator.$options.validate({
          value: context.value,
          parse,
          transform: false,
          expression: expression as DateValidatorExpression,
        });
      }

      if (result! && result.type === "valid") return result;

      index++;
    }

    return { type: "invalid" };
  },
});
