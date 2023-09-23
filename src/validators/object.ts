import { deepGet } from "../common";
import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression, booleanValidator } from "./boolean";
import { DateValidatorExpression, dateValidator } from "./date";
import { NumberValidatorExpression, numberValidator } from "./number";
import { StringValidatorExpression, stringValidator } from "./string";
import { TupleValidatorExpression } from "./tuple";
import { UnionValidatorExpression } from "./union";

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
        // const [_1, ...tupleExpression] = expression;
        const [mode, ...arrayParse] = parse;
        if (mode === "tuple") {
          // TODO
        }
        if (mode === "union") {
          // TODO
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
});
