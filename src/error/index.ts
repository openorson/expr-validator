export class ValidationError extends Error {
  static message({ comment, type, expect, actual, value }: { comment?: string; type: string; expect: unknown; actual?: unknown; value: unknown }) {
    return `数据${comment}${type}错误，预期${type}'${expect}'，${actual ? `实际${type}'${actual}'，` : ""}值'${value}'。`;
  }

  constructor(message?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}
