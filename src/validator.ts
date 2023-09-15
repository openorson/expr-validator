import { TsTypeFromValidatorExpression } from "./types/expression";
import { ValidatorOptions } from "./types/validator";

export function createValidator<Expression>(options: ValidatorOptions<Expression>) {
  function validator<const Expr extends Expression, Type = TsTypeFromValidatorExpression<Expr>>(
    value: unknown,
    expression: Expr
  ): value is Type {
    return true;
  }

  validator[Symbol.toStringTag] = "ExprValidator";

  return validator;
}
