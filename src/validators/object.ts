import { deepGet } from "../common";
import { ValidatorArrayExpressionTupleMode, ValidatorArrayExpressionUnionMode } from "../types/expression";
import { StringExpressionParse } from "../types/validator";
import { createValidator } from "../validator/validator";
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
  validate({ value: objectValue, parse: objectParse }) {
    for (const { path, expression, parse } of objectParse) {
      const value = deepGet(objectValue, path.split("."));
      if (Array.isArray(parse)) {
        const [mode] = parse;
        if (mode === "tuple") {
          const valid = tupleValidator.$options.validate({
            value,
            parse: parse as [ValidatorArrayExpressionTupleMode, ...StringExpressionParse[]],
            expression: expression as TupleValidatorExpression,
          });
          if (valid) return valid;
        }
        if (mode === "union") {
          const valid = unionValidator.$options.validate({
            value,
            parse: parse as [ValidatorArrayExpressionUnionMode, ...StringExpressionParse[]],
            expression: expression as UnionValidatorExpression,
          });
          if (valid) return valid;
        }
      } else {
        if (parse.type === "string") {
          const valid = stringValidator.$options.validate({ value, parse, expression: expression as StringValidatorExpression });
          if (valid) return valid;
        }
        if (parse.type === "number") {
          const valid = numberValidator.$options.validate({ value, parse, expression: expression as NumberValidatorExpression });
          if (valid) return valid;
        }
        if (parse.type === "boolean") {
          const valid = booleanValidator.$options.validate({ value, parse, expression: expression as BooleanValidatorExpression });
          if (valid) return valid;
        }
        if (parse.type === "date") {
          const valid = dateValidator.$options.validate({ value, parse, expression: expression as DateValidatorExpression });
          if (valid) return valid;
        }
      }
    }
  },
  parse({ value }) {
    return value;
  },
});
