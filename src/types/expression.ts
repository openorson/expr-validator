import { ValidatorDataType } from "./datatype";

export type ValidatorExpressionTypeTemplate<Type extends keyof ValidatorDataType = keyof ValidatorDataType> = Type;
export type ValidatorExpressionEachTemplate = "[]" | "";
export type ValidatorExpressionRequiredTemplate = "!";
export type ValidatorExpressionOptionalTemplate = "?";
export type ValidatorExpressionRequiredAndOptionalTemplate = ValidatorExpressionRequiredTemplate | ValidatorExpressionOptionalTemplate;
export type ValidatorExpressionTypeSectionTemplate<Type extends keyof ValidatorDataType = keyof ValidatorDataType> =
  `${ValidatorExpressionTypeTemplate<Type>}${ValidatorExpressionEachTemplate}${ValidatorExpressionRequiredAndOptionalTemplate}`;
export type ValidatorExpressionArgTemplate<T extends readonly [string, string]> = T[0] extends infer U
  ? U extends ""
    ? `{${T[1]}}` | ""
    : `{${T[0]}:${T[1]}}` | ""
  : never;
export type ValidatorExpressionArgsTemplate<T extends readonly [string, string][], U extends [string, string] = T[0]> = T extends [
  infer _,
  ...infer B
]
  ? B extends [string, string][]
    ? `${ValidatorExpressionArgTemplate<U>}${ValidatorExpressionArgsTemplate<B>}`
    : never
  : "";
export type ValidatorExpressionCommentTemplate = `(${string})` | "";
export type ValidatorExpression<
  Type extends keyof ValidatorDataType = keyof ValidatorDataType,
  Args extends [string, string][] = []
> = `${ValidatorExpressionTypeSectionTemplate<Type>}${ValidatorExpressionArgsTemplate<Args>}${ValidatorExpressionCommentTemplate}`;

export type TypeSectionFromValidatorStringExpression<Expression> = Expression extends `${infer Type}{${string}}`
  ? Type
  : Expression extends `${infer Type}{${string}}(${string})`
  ? Type
  : Expression extends `${infer Type}(${string})`
  ? Type
  : Expression;
export type ValidatorStringExpressionAsType<Expression> =
  TypeSectionFromValidatorStringExpression<Expression> extends `${infer A}${ValidatorExpressionRequiredTemplate}`
    ? A extends `${infer B}[]`
      ? B extends keyof ValidatorDataType
        ? ValidatorDataType[B][]
        : never
      : A extends keyof ValidatorDataType
      ? ValidatorDataType[A]
      : never
    : TypeSectionFromValidatorStringExpression<Expression> extends `${infer A}${ValidatorExpressionOptionalTemplate}`
    ? A extends `${infer B}[]`
      ? B extends keyof ValidatorDataType
        ? ValidatorDataType[B][] | null | undefined
        : never
      : A extends keyof ValidatorDataType
      ? ValidatorDataType[A] | null | undefined
      : never
    : never;

export type ValidatorArrayExpressionUnionMode = "union";
export type ValidatorArrayExpressionTupleMode = "tuple";
export type ValidatorArrayExpressionMode = ValidatorArrayExpressionUnionMode | ValidatorArrayExpressionTupleMode;
export type ValidatorTupleExpressionAsType<Expression> = Expression extends readonly [infer A, ...infer B]
  ? [ValidatorStringExpressionAsType<A>, ...ValidatorTupleExpressionAsType<B>]
  : [];

export type ValidatorObjectExpressionAsType<Expression> = keyof Expression extends never
  ? Expression
  : {
      [P in keyof Expression]: Expression[P] extends string
        ? ValidatorStringExpressionAsType<Expression[P]>
        : ValidatorObjectExpressionAsType<Expression[P]>;
    };

export type ValidatorExpressionAsType<Expression> = Expression extends Record<string, unknown>
  ? ValidatorObjectExpressionAsType<Expression>
  : Expression extends string
  ? ValidatorStringExpressionAsType<Expression>
  : Expression extends readonly unknown[]
  ? Expression extends readonly [ValidatorArrayExpressionUnionMode, ...infer E]
    ? ValidatorTupleExpressionAsType<E>[number]
    : Expression extends readonly [ValidatorArrayExpressionTupleMode, ...infer E]
    ? ValidatorTupleExpressionAsType<E>
    : ValidatorTupleExpressionAsType<Expression>
  : never;
