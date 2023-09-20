import { ValidatorExpressionAsType } from "./expression";

export interface ValidatorFactoryOptions<Expression> {
  validate: (context: { expression: Expression; value: unknown; meta: unknown }) => unknown;
  parse?: () => unknown;
}

export interface ValidatorOptions {
  context?: unknown;
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
