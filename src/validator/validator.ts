import { ValidatorExpressionAsType } from "../types/expression";
import { Validator, ValidatorFactoryOptions, ValidatorOptions } from "../types/validator";

function resolveExpression(expression: string) {
  let type: string;
  let each: boolean;
  let optional: boolean;
  let args: any;
  let comment: string;

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
  args = argsIdx === -1 ? {} : expression.substring(argsIdx, expression.lastIndexOf("}") + 1);
  comment = commentIdx === -1 ? "" : expression.substring(commentIdx + 1, expression.indexOf(")"));

  return { type, each, optional, args, comment };
}

export function createValidator<Expr, Options extends {} = {}>(factoryOptions: ValidatorFactoryOptions<Expr>): Validator<Expr, Options> {
  function validator<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidatorOptions
  ): value is Type {
    let type: string;
    if (typeof expression === "string") {
      console.log("********************************************");
      console.log("type ", resolveExpression(expression));
      console.log("********************************************");
      // const segs = expression.split("{");
      // type = segs[0];
      // if (segs.length === 1) {

      // }
      // console.log(arr);
    }
    const valid = factoryOptions.validate({ expression, value, type: "", each: true, optional: true, args: {} });
    return !!valid;
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
