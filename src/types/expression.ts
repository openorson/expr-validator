import { ValidatorDataType } from "./datatype";

export type ValidatorExpressionTypeTemplate<Type extends keyof ValidatorDataType = keyof ValidatorDataType> = Type;
export type ValidatorExpressionEachTemplate = "[]" | "";
export type ValidatorExpressionOptionalTemplate = "!" | "?";
export type ValidatorExpressionArgTemplate<T extends readonly [string, string]> = T[0] extends infer U
  ? U extends ""
    ? `{${T[1]}}` | ""
    : `{${T[0]}:${T[1]}}` | ""
  : never;
export type ValidatorExpressionArgsTemplate<
  T extends readonly [string, string][],
  U extends [string, string] = T[0]
> = T extends [infer _, ...infer B]
  ? B extends [string, string][]
    ? `${ValidatorExpressionArgTemplate<U>}${ValidatorExpressionArgsTemplate<B>}`
    : never
  : "";
export type ValidatorExpression<
  Type extends keyof ValidatorDataType = keyof ValidatorDataType,
  Args extends [string, string][] = []
> = `${ValidatorExpressionTypeTemplate<Type>}${ValidatorExpressionEachTemplate}${ValidatorExpressionOptionalTemplate}${ValidatorExpressionArgsTemplate<Args>}`;
