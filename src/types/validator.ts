export type ArrayExpressionMode = "union" | "tuple";

export interface ValidatorFactoryOptions<Expression, Mode extends ArrayExpressionMode = ArrayExpressionMode> {
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
  throw?: boolean;
}
