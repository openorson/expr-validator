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
  throw?: boolean;
}
