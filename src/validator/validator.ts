import { parseExpression } from "../common";
import { ValidationError } from "../error";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ExpressionParse } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(validatorOptions: ValidatorOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type {
    const valid = validatorOptions.validate({
      expression,
      value,
      transform: options?.transform ?? false,
      parse: parseExpression(expression, true) as ExpressionParse<Expression>,
    });

    if (valid.type === "valid") {
      return true;
    }

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
    }

    throw new Error("Validator error.");
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["$options"] = validatorOptions;

  return validator;
}
