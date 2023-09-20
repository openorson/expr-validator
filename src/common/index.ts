export function parseStringExpression(expression: string) {
  const matchs = expression.match(/^(\w+)(\[\])?([\!\?])(\{.*\})?(\(.*\))?$/);
  if (!matchs) return null;
  let [_, type, each, optional, args, comment] = matchs;
  return {
    type,
    each: !!each,
    optional: optional === "?",
    args: args
      ? Object.fromEntries(
          args.match(/(?<=\{).*?(?=\})/g)?.map((arg) => {
            const [key, val] = arg.split(":");
            if (val === void 0) return ["default", key];
            return [key, val];
          }) ?? []
        )
      : void 0,
    comment,
  };
}

export function parseArrayExpression(expression: string[]) {
  const [mode, ...expressions] = expression as string[];
  return [mode, expressions.map((expression) => parseStringExpression(expression))];
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

export function parseExpression(expression: unknown) {
  const type = Object.prototype.toString.call(expression);
  if (type === "[object String]") return parseStringExpression(expression as string);
  if (type === "[object Object]") return parseObjectExpression(expression as Record<string, unknown>);
  if (type === "[object Array]") return parseArrayExpression(expression as string[]);
  throw new Error("Invalid expression");
}
