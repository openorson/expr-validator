import { parseExpression } from "../common";
import { ValidatorError } from "../error";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ParseOptions, ExpressionParse } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(validatorOptions: ValidatorOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type {
    const parse = parseExpression(expression, true) as ExpressionParse<Expression>;
    const valid = !!validatorOptions.validate({ expression, value, parse });
    if (!valid && options?.throw) throw new ValidatorError("验证失败");
    return valid;
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
