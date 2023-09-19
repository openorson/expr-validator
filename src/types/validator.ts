import { ValidatorArrayExpressionMode, ValidatorExpressionAsType } from "./expression";

export interface ValidatorFactoryOptions<Expression, Mode extends ValidatorArrayExpressionMode = ValidatorArrayExpressionMode> {
  arrayMode?: Mode;
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
  context?: unknown;
  parse?: boolean;
  prompt?: boolean;
  throw?: boolean;
}

export interface Validator<Expr, Options extends {}> {
  readonly [Symbol.toStringTag]: string;
  <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidatorOptions
  ): value is Type;
}
