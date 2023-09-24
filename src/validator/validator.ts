import { parseExpression } from "../common";
import { ValidationError } from "../error";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ParseOptions, ExpressionParse } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(validatorOptions: ValidatorOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions,
    _parse?: ExpressionParse<Expression>
  ): value is Type {
    const parse = _parse ?? (parseExpression(expression, true) as ExpressionParse<Expression>);
    const valid = validatorOptions.validate({ expression, value, parse });

    if (valid) {
      if (valid.type === "invalid") {
        if (options) {
          if (options.throw) {
            if (options.message) {
              if (typeof options.message === "function") {
                throw new ValidationError(options.message({ value }));
              } else {
                throw new ValidationError(options.message);
              }
            } else {
              const comment = valid.comment ? ` ${valid.comment}` : "";
              throw new ValidationError(`Invalid data${comment}, should match the expression ${JSON.stringify(expression)}.`);
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
    } else {
      return true;
    }
  }

  function parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions & ParseOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    const parse = parseExpression(expression, true) as ExpressionParse<Expression>;
    const parseValue = validatorOptions.parse?.({ expression, value, parse }) ?? value;
    return [validator(parseValue, expression, options, parse), parseValue as Type];
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["$options"] = validatorOptions;
  validator["parse"] = parse;

  return validator;
}
