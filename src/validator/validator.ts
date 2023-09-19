import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorFactoryOptions, ValidatorOptions } from "../types/validator";

function resolveExpression(expression: string) {
  let type: string;
  let each: boolean;
  let optional: boolean;
  let args: Record<string, string> = {};
  let comment: string = "";

  const [eachIdx, requiredIndex, optionalIdx, argsIdx, commentIdx] = [
    expression.indexOf("["),
    expression.indexOf("!"),
    expression.indexOf("?"),
    expression.indexOf("{"),
    expression.indexOf("("),
  ];

  each = eachIdx !== -1;
  optional = optionalIdx !== -1;
  type = expression.substring(0, each ? eachIdx : optional ? optionalIdx : requiredIndex);

  if (argsIdx !== -1) {
    expression
      .substring(argsIdx, expression.lastIndexOf("}") + 1)
      .split("}{")
      .forEach((item, idx, items) => {
        let arg: string[];
        if (idx === 0) {
          arg = item.replace("{", "").split(":");
        } else if (idx === items.length - 1) {
          arg = item.replace("}", "").split(":");
        } else {
          arg = item.split(":");
        }
        arg[1] ? (args[arg[0]] = arg[1]) : (args["default"] = arg[0]);
      });
  }

  if (commentIdx !== -1) {
    comment = expression.substring(commentIdx + 1, expression.indexOf(")"));
  }

  return { type, each, optional, args, comment };
}

export function createValidator<Expr, Options extends {} = {}>(factoryOptions: ValidatorFactoryOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidatorOptions
  ): value is Type {
    if (typeof expression === "string") {
      const valid = factoryOptions.validate({ expression, value, ...resolveExpression(expression) });
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
