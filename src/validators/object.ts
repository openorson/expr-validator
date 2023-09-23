import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { StringValidatorExpression } from "./string";
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
  validate(context) {
    return;
  },
});
