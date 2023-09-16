import { ValidatorExpressionAsType } from "./types/expression";
import { ValidatorOptions } from "./types/validator";

export function createValidator<Expr>(options: ValidatorOptions<Expr>) {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression
  ): value is Type {
    return true;
  }

  validator[Symbol.toStringTag] = "ExprValidator";

  return validator;
}
