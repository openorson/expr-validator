import { ValidatorExpressionAsType } from "./types/expression";
import { ValidatorFactoryOptions, ValidatorOptions } from "./types/validator";

export function createValidator<Expr>(options: ValidatorFactoryOptions<Expr>) {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): value is Type {
    return true;
  }

  function parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    return [validator(value, expression), "" as Type];
  }

  function prompt<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    return [validator(value, expression), "" as Type];
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["parse"] = parse;
  validator["prompt"] = prompt;

  return validator;
}
