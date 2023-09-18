import { createValidator } from "../validator";
import { BooleanValidatorExpression } from "./boolean";
import { DateRangeValidatorExpression } from "./data-range";
import { DateValidatorExpression } from "./date";
import { NumberValidatorExpression } from "./number";
import { NumberRangeValidatorExpression } from "./number-range";
import { StringValidatorExpression } from "./string";
import { TupleValidatorExpression } from "./tuple";

type ObjectValidatorFieldExpression =
  | StringValidatorExpression
  | NumberValidatorExpression
  | NumberRangeValidatorExpression
  | BooleanValidatorExpression
  | DateValidatorExpression
  | DateRangeValidatorExpression
  | TupleValidatorExpression;
type ObjectValidatorExpression<
  Expression = Record<string, ObjectValidatorFieldExpression> | ObjectValidatorFieldExpression
> = Record<string, Expression> | ObjectValidatorFieldExpression;
export type NestedObjectValidatorExpression = ObjectValidatorExpression<
  ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression>>>
>;

export const objectValidator = createValidator<NestedObjectValidatorExpression>({
  validate(context) {},
});
