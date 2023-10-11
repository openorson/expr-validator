import { StringExpressionParse, ValidateContext, ValidateInvalidResult, ValidateValidResult } from "../types/validator";

export function deepSet(object: any, keys: string[], value: unknown) {
  return keys.reduce((xs, x) => (xs[x] = x === keys.slice(-1)[0] ? value : xs[x] || {}), object);
}

export function parseStringExpression(expression: string): StringExpressionParse {
  const matchs = expression.match(/^(\w+)(\[\])?([\!\?])(\{.*\})?(\(.*\))?$/);
  if (!matchs) throw new Error("Invalid expression");
  let [_, type, each, optional, args, comment] = matchs;
  return {
    type,
    each: !!each,
    optional: optional === "?",
    args: args
      ? Object.fromEntries(
          args.match(/(?<=\{).*?(?=\})/g)?.map((arg, index) => {
            const [key, val] = arg.split(":");
            if (val === void 0) return [`$${index + 1}`, key];
            return [key, val];
          }) ?? []
        )
      : void 0,
    comment,
  };
}

export function parseArrayExpression(expression: string[]) {
  const [mode, ...expressions] = expression as string[];
  return [mode, ...expressions.map((expression) => parseStringExpression(expression))] as const;
}

export function* parseObjectExpressionGenerator(
  object: any,
  expression: Record<string, unknown>,
  key: string[] = []
): Generator<{ value: any; path: string[]; parse: StringExpressionParse | readonly [string, ...StringExpressionParse[]] }> {
  let clone = Object.assign({}, expression);
  const keys = Object.keys(clone);

  let index = 0;
  while (index < keys.length) {
    const expr = expression[keys[index]];
    const path = [...key, keys[index]];
    const value = object[keys[index]];

    if (typeof expr === "string") {
      yield { value, path, parse: parseStringExpression(expr as string) };
    } else if (Array.isArray(expr)) {
      yield { value, path, parse: parseArrayExpression(expr as string[]) };
    } else {
      for (const iterator of parseObjectExpressionGenerator(value, expr as Record<string, unknown>, path)) {
        yield iterator;
      }
    }

    index++;
  }

  return clone;
}

export function parseExpression(expression: unknown, value?: any) {
  const type = Object.prototype.toString.call(expression);
  if (type === "[object String]") return parseStringExpression(expression as string);
  if (type === "[object Object]") return parseObjectExpressionGenerator(value, expression as Record<string, unknown>);
  if (type === "[object Array]") return parseArrayExpression(expression as string[]);
  throw new Error("Invalid expression");
}

export function validate({
  context,
  transform,
  typeValidate,
  argsValidate,
}: {
  context: ValidateContext<string>;
  transform: (value: unknown) => any;
  typeValidate: (value: unknown) => boolean;
  argsValidate?: (value: any) => ValidateInvalidResult | ValidateValidResult;
}): ValidateInvalidResult | ValidateValidResult {
  let value = context.value;

  if (context.parse.optional) {
    if (value === null || value === void 0) return { type: "valid", value };
  } else {
    if (value === null || value === void 0) return { type: "invalid" };
  }

  if (context.parse.each) {
    if (!Array.isArray(value)) return { type: "invalid" };

    for (let index = 0; index < value.length; index++) {
      let item = value[index];
      if (context.transform) item = transform(item);

      if (typeValidate(item)) {
        if (argsValidate) {
          const result = argsValidate(item);
          if (result.type === "invalid") return result;
        }
        value[index] = item;
      } else {
        return { type: "invalid" };
      }
    }

    return { type: "valid", value };
  } else {
    if (context.transform) value = transform(value);

    if (typeValidate(value)) {
      return argsValidate ? argsValidate(value) : { type: "valid", value };
    } else {
      return { type: "invalid" };
    }
  }
}
