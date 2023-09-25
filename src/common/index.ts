import { StringExpressionParse } from "../types/validator";

export function typeOf(value: unknown) {
  return Object.prototype.toString.call(value).toLowerCase().slice(8, -1);
}

export function deepGet(object: any, keys: string[]): unknown {
  return keys.reduce((xs, x) => (xs && xs[x] !== null && xs[x] !== void 0 ? xs[x] : null), object);
}

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

export function parseObjectExpression(expression: Record<string, unknown>) {
  let clone = Object.assign({}, expression);
  const keys = Object.keys(clone);

  let index = 0;
  while (index < keys.length) {
    const type = Object.prototype.toString.call(expression[keys[index]]);

    if (type === "[object String]") {
      clone[keys[index]] = parseStringExpression(expression[keys[index]] as string);
    } else if (type === "[object Object]") {
      clone[keys[index]] = parseObjectExpression(expression[keys[index]] as Record<string, unknown>);
    } else if (type === "[object Array]") {
      clone[keys[index]] = parseArrayExpression(expression[keys[index]] as string[]);
    } else {
      throw new Error("Invalid expression");
    }

    index++;
  }

  return clone;
}

export function* parseObjectExpressionGenerator(
  expression: Record<string, unknown>,
  key: string[] = []
): Generator<{ path: string[]; parse: StringExpressionParse | readonly [string, ...StringExpressionParse[]] }> {
  let clone = Object.assign({}, expression);
  const keys = Object.keys(clone);

  let index = 0;
  while (index < keys.length) {
    const type = Object.prototype.toString.call(expression[keys[index]]);
    const path = [...key, keys[index]];

    if (type === "[object String]") {
      yield { path, parse: parseStringExpression(expression[keys[index]] as string) };
    } else if (type === "[object Object]") {
      for (const iterator of parseObjectExpressionGenerator(expression[keys[index]] as Record<string, unknown>, path)) {
        yield iterator;
      }
    } else if (type === "[object Array]") {
      yield { path, parse: parseArrayExpression(expression[keys[index]] as string[]) };
    } else {
      throw new Error("Invalid expression");
    }

    index++;
  }

  return clone;
}

export function parseExpression(expression: unknown, generator?: boolean) {
  const type = Object.prototype.toString.call(expression);
  if (type === "[object String]") return parseStringExpression(expression as string);
  if (type === "[object Object]")
    return generator
      ? parseObjectExpressionGenerator(expression as Record<string, unknown>)
      : parseObjectExpression(expression as Record<string, any>);
  if (type === "[object Array]") return parseArrayExpression(expression as string[]);
  throw new Error("Invalid expression");
}

export function typeCheck<Type>(value: unknown, parse: StringExpressionParse, isType: (value: unknown) => boolean): value is Type {
  if (parse.optional) {
    if (value === null || value === void 0) return true;
  } else {
    if (value === null || value === void 0) return false;
  }

  if (parse.each) {
    if (!Array.isArray(value)) return false;
    return value.some((item) => isType(item));
  } else {
    if (Array.isArray(value)) return false;
    return isType(value);
  }
}
