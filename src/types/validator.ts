export interface ValidatorOptions<Expression> {
  validate: (context: {
    expression: Expression;
    value: unknown;
    type: string;
    each: boolean;
    optional: boolean;
    args: Record<string, unknown>;
  }) => unknown;
}
