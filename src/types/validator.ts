import { ValidatorArrayExpressionMode, ValidatorExpressionAsType } from "./expression";

export interface ValidatorFactoryOptions<
  Expression,
  Mode extends ValidatorArrayExpressionMode = ValidatorArrayExpressionMode
> {
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
  parse?: boolean;
  prompt?: boolean;
  throw?: boolean;
}

export interface Validator<Expr, Mode extends ValidatorArrayExpressionMode = "tuple"> {
  readonly [Symbol.toStringTag]: string;
  <
    const Expression extends Expr,
    Type = ValidatorExpressionAsType<Expression extends readonly unknown[] ? [Mode, ...Expression] : Expression>
  >(
    value: unknown,
    expression: Expression,
    options?: ValidatorOptions
  ): value is Type;
}
