import { parseExpression } from "../common";
import { ValidationError } from "../error";
import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorOptions, ValidateOptions, ExpressionParse } from "../types/validator";

export function createValidator<ValidatorExpression, Options extends {} = {}>(
  validatorOptions: ValidatorOptions<ValidatorExpression>
): Validator<ValidatorExpression, Options> {
  function validator<const Expression extends ValidatorExpression, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type {
    const valid = validatorOptions.validate({
      expression,
      value,
      transform: false,
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

    throw new Error("An unexpected error occurred in the validator.");
  }

  function transform<const Expression extends ValidatorExpression, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown] {
    const valid = validatorOptions.validate({
      expression,
      value,
      transform: true,
      parse: parseExpression(expression, true) as ExpressionParse<Expression>,
    });

    if (valid.type === "valid") {
      return [true, valid.value];
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
          return [false, value];
        }
      } else {
        return [false, value];
      }
    }

    throw new Error("An unexpected error occurred in the validator.");
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["$options"] = validatorOptions;
  validator["transform"] = transform;

  return validator;
}
