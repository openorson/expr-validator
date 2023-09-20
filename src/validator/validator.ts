import { parseExpression } from "../common";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorFactoryOptions, ValidatorOptions } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(factoryOptions: ValidatorFactoryOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidatorOptions
  ): value is Type {
    const valid = factoryOptions.validate({ expression, value, meta: parseExpression(expression) });
    return !!valid;
  }

  function parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    return [validator(value, expression), "" as Type];
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["parse"] = parse;

  return validator;
}
