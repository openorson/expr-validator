import { createValidator } from "../validator/validator";
import { BooleanValidatorExpression, booleanValidator } from "./boolean";
import { DateValidatorExpression, dateValidator } from "./date";
import { NumberValidatorExpression, numberValidator } from "./number";
import { NestedObjectValidatorExpression, objectValidator } from "./object";
import { StringValidatorExpression, stringValidator } from "./string";
import { TupleValidatorExpression, tupleValidator } from "./tuple";
import { UnionValidatorExpression, unionValidator } from "./union";

export type AnyValidatorExpression =
  | StringValidatorExpression
  | NumberValidatorExpression
  | BooleanValidatorExpression
  | DateValidatorExpression
  | TupleValidatorExpression
  | UnionValidatorExpression
  | NestedObjectValidatorExpression;

export const anyValidator = createValidator<AnyValidatorExpression>({
  validate(context: any) {
    if (context.parse.type) {
      if (context.parse.type === "string") return stringValidator.$options.validate(context);
      if (context.parse.type === "number") return numberValidator.$options.validate(context);
      if (context.parse.type === "boolean") return booleanValidator.$options.validate(context);
      if (context.parse.type === "date") return dateValidator.$options.validate(context);
    }

    if (Array.isArray(context.parse)) {
      const [mode] = context.parse;
      if (mode === "tuple") return tupleValidator.$options.validate(context);
      if (mode === "union") return unionValidator.$options.validate(context);
    }

    return objectValidator.$options.validate(context);
  },
});
