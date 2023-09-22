import {
  ValidatorArrayExpressionMode,
  ValidatorArrayExpressionTupleMode,
  ValidatorArrayExpressionUnionMode,
  ValidatorExpressionAsType,
} from "./expression";

export interface StringExpressionParse {
  type: string;
  each: boolean;
  optional: boolean;
  args?: Record<string, string>;
  comment?: string;
}

export type ExpressionParse<Expression> = Expression extends Record<string, unknown>
  ? Generator<{ path: string; parse: StringExpressionParse | [ValidatorArrayExpressionMode, ...StringExpressionParse[]] }>
  : Expression extends string
  ? StringExpressionParse
  : Expression extends readonly unknown[]
  ? Expression extends readonly [ValidatorArrayExpressionUnionMode, ...infer _]
    ? [ValidatorArrayExpressionUnionMode, ...StringExpressionParse[]]
    : Expression extends readonly [ValidatorArrayExpressionTupleMode, ...infer _]
    ? [ValidatorArrayExpressionTupleMode, ...StringExpressionParse[]]
    : [ValidatorArrayExpressionTupleMode, ...StringExpressionParse[]]
  : never;

export interface ValidateContext<Expression> {
  expression: Expression;
  value: any;
  parse: ExpressionParse<Expression>;
}

export interface ValidatorOptions<Expression> {
  type: (value: unknown) => unknown;
  validate?: (context: ValidateContext<Expression>) => unknown;
  parse?: () => unknown;
}

export interface ValidateOptions {
  throw?: boolean;
}

export interface ParseOptions {}

export interface Validator<Expr, Options extends {}> {
  readonly [Symbol.toStringTag]: string;
  <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type;
  parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions & ParseOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown];
}
