import { ValidatorExpressionAsType } from "./expression";

export interface ValidatorFactoryOptions<Expression> {
  validate: (context: {
    expression: Expression;
    value: unknown;
    type: string;
    each: boolean;
    optional: boolean;
    args: Record<string, unknown>;
  }) => unknown;
  parse?: () => unknown;
}

export interface ValidatorOptions {
  parse?: boolean;
  prompt?: boolean;
  throw?: boolean;
}

export interface Validator<Expr> {
  readonly [Symbol.toStringTag]: string;
  <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): value is Type;
  parse: <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ) => [valid: true, value: Type] | [valid: false, value: unknown];
  prompt: <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ) => value is Type;
}
