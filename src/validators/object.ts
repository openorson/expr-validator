import { createValidator } from "../validator";
import { AnyValidatorExpression } from "./any";

type ObjectValidatorExpression<Expression = Record<string, AnyValidatorExpression> | AnyValidatorExpression> =
  | Record<string, Expression>
  | AnyValidatorExpression;
export type NestedObjectValidatorExpression = ObjectValidatorExpression<
  ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression<ObjectValidatorExpression>>>
>;

export const objectValidator = createValidator<NestedObjectValidatorExpression>({
  validate(context) {},
});
