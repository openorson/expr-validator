import { ValidatorExpressionAsType } from "./types/expression";
import { ValidatorFactoryOptions, ValidatorOptions, ArrayExpressionMode } from "./types/validator";

export function createValidator<Expr, Mode extends ArrayExpressionMode = "tuple">(
  options: ValidatorFactoryOptions<Expr, Mode>
) {
  function validator<
    const Expression extends Expr,
    Type = ValidatorExpressionAsType<Expression extends readonly unknown[] ? [Mode, ...Expression] : Expression>
  >(value: unknown, expression: Expression, options?: ValidatorOptions): value is Type {
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
