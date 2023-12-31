import { deepSet } from "../common";
import { ValidatorArrayExpressionTupleMode, ValidatorArrayExpressionUnionMode } from "../types/expression";
import { StringExpressionParse, ValidateInvalidResult, ValidateValidResult } from "../types/validator";
import { createValidator } from "../validator";
import { BooleanValidatorExpression, booleanValidator } from "./boolean";
import { DateValidatorExpression, dateValidator } from "./date";
import { NumberValidatorExpression, numberValidator } from "./number";
import { StringValidatorExpression, stringValidator } from "./string";
import { TupleValidatorExpression, tupleValidator } from "./tuple";
import { UnionValidatorExpression, unionValidator } from "./union";

type ObjectValidatorFieldExpression =
  | StringValidatorExpression
  | NumberValidatorExpression
  | BooleanValidatorExpression
  | DateValidatorExpression
  | TupleValidatorExpression
  | UnionValidatorExpression;

type ObjectValidatorExpression<Expression = never> = Record<
  string,
  Expression extends never ? ObjectValidatorFieldExpression : ObjectValidatorFieldExpression | Expression
>;

export type NestedObjectValidatorExpression = ObjectValidatorExpression<
  ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression>>>
>;

export interface ObjectValidatorOptions {}

export const objectValidator = createValidator<NestedObjectValidatorExpression, ObjectValidatorOptions>({
  validate(context) {
    const object = {};

    if (typeof context.value !== "object") return { type: "invalid" };

    for (const { value, path, expression, parse } of context.parse) {
      let result: ValidateInvalidResult | ValidateValidResult;

      if (Array.isArray(parse)) {
        const [mode] = parse;
        if (mode === "tuple") {
          result = tupleValidator.$options.validate({
            value,
            parse: parse as [ValidatorArrayExpressionTupleMode, ...StringExpressionParse[]],
            transform: context.transform,
            expression: expression as TupleValidatorExpression,
          });
        }
        if (mode === "union") {
          result = unionValidator.$options.validate({
            value,
            parse: parse as [ValidatorArrayExpressionUnionMode, ...StringExpressionParse[]],
            transform: context.transform,
            expression: expression as UnionValidatorExpression,
          });
        }
      } else {
        if (parse.type === "string") {
          result = stringValidator.$options.validate({
            value,
            parse,
            transform: context.transform,
            expression: expression as StringValidatorExpression,
          });
        }
        if (parse.type === "number") {
          result = numberValidator.$options.validate({
            value,
            parse,
            transform: context.transform,
            expression: expression as NumberValidatorExpression,
          });
        }
        if (parse.type === "boolean") {
          result = booleanValidator.$options.validate({
            value,
            parse,
            transform: context.transform,
            expression: expression as BooleanValidatorExpression,
          });
        }
        if (parse.type === "date") {
          result = dateValidator.$options.validate({
            value,
            parse,
            transform: context.transform,
            expression: expression as DateValidatorExpression,
          });
        }
      }

      if (result!) {
        if (result.type === "invalid") return result;
        deepSet(object, path, result.value);
      }
    }

    return { type: "valid", value: object };
  },
});
