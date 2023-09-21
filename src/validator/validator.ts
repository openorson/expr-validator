import { parseExpression } from "../common";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ParseOptions, ExpressionParse } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(validatorOptions: ValidatorOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type {
    const valid = validatorOptions.validate({ expression, value, parse: parseExpression(expression) as ExpressionParse<Expression> });
    return !!valid;
  }

  function parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions & ParseOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    return [validator(value, expression), "" as Type];
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["parse"] = parse;

  return validator;
}
