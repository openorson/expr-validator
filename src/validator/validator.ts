import { parseExpression } from "../common";
import { ValidationError } from "../error";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ParseOptions, ExpressionParse } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(validatorOptions: ValidatorOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type {
    const parse = parseExpression(expression, true) as ExpressionParse<Expression>;
    const valid = validatorOptions.validate({ expression, value, parse });

    if (typeof valid === "string") {
      if (options) {
        if (options.throw) {
          if (options.message) {
            if (typeof options.message === "function") {
              throw new ValidationError(options.message({ value }));
            } else {
              throw new ValidationError(options.message);
            }
          } else {
            throw new ValidationError(valid);
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
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
