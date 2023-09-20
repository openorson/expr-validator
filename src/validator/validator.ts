import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorFactoryOptions, ValidatorOptions } from "../types/validator";

export function createValidator<Expr, Options extends {} = {}>(factoryOptions: ValidatorFactoryOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidatorOptions
  ): value is Type {
    if (typeof expression === "string") {
      const matchs = expression.match(/^(\w+)(\[\])?([\!\?])(\{.*\})?(\(.*\))?$/);
      if (!matchs) return false;
      let [_, type, each, optional, args, comment] = matchs;
      const valid = factoryOptions.validate({
        expression,
        value,
        type,
        each: !!each,
        optional: optional === "?",
        args: args ? args.match(/\{.*?\}/g) : {},
        comment,
      });
      return !!valid;
    }
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
  ): value is Type {
    return true;
  }

  validator[Symbol.toStringTag] = "ExprValidator";
  validator["parse"] = parse;
  validator["prompt"] = prompt;

  return validator;
}
