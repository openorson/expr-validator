export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function validationErrorMessage({
  comment,
  type,
  expect,
  actual,
  value,
}: {
  comment?: string;
  type: string;
  expect: unknown;
  actual: unknown;
  value: unknown;
}) {
  return `数据${comment}${type}错误，预期${type}'${expect}'，实际${type}'${actual}'，值'${value}'。`;
}
