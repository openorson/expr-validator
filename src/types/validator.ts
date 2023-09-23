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
  ? Generator<{ path: string; expression: unknown; parse: StringExpressionParse | [ValidatorArrayExpressionMode, ...StringExpressionParse[]] }>
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
  value: unknown;
  parse: ExpressionParse<Expression>;
}

export interface ValidateInvalidResult {
  type: "invalid";
  comment?: string;
}

export interface ValidatorOptions<Expression> {
  validate: (context: ValidateContext<Expression>) => ValidateInvalidResult | void;
  parse?: (context: ValidateContext<Expression>) => unknown;
}

export interface ValidateOptions {
  throw?: boolean;
  message?: string | ((context: { value: unknown }) => string);
}

export interface ParseOptions {}

export interface Validator<Expr, Options extends {}> {
  readonly [Symbol.toStringTag]: string;
  $options: ValidatorOptions<Expr>;
  <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions,
    parse?: ExpressionParse<Expression>
  ): value is Type;
  parse<const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions & ParseOptions
  ): [valid: true, value: Type] | [valid: false, value: unknown];
}
