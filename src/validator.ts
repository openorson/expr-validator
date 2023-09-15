import { TsTypeFromValidatorExpression } from "./types/expression";
import { ValidatorOptions } from "./types/validator";

export function createValidator<Expression>(options: ValidatorOptions<Expression>) {
  function validator<const Expr extends Expression, Type = TsTypeFromValidatorExpression<Expr>>(
    expression: Expr,
    value: unknown
  ): value is Type {
    return true;
  }

  return validator;
}
