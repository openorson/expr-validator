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
  ? Generator<{ path: string[]; expression: unknown; parse: StringExpressionParse | [ValidatorArrayExpressionMode, ...StringExpressionParse[]] }>
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
  transform: boolean;
}

export interface ValidateInvalidResult {
  type: "invalid";
  comment?: string;
}

export interface ValidateValidResult {
  type: "valid";
  value: any;
}

export interface ValidatorOptions<Expression> {
  validate: (context: ValidateContext<Expression>) => ValidateInvalidResult | ValidateValidResult;
}

export interface ValidateOptions {
  throw?: boolean;
  message?: string | ((context: { value: unknown }) => string);
  transform?: boolean;
}

export interface Validator<Expr, Options extends {}> {
  readonly [Symbol.toStringTag]: string;
  $options: ValidatorOptions<Expr>;
  <const Expression extends Expr, Type = ValidatorExpressionAsType<Expression>>(
    value: unknown,
    expression: Expression,
    options?: Options & ValidateOptions
  ): value is Type;
}
