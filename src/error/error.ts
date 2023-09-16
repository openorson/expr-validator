export class ValidatorError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ValidatorError";
  }
}

export function isValidatorError(error: unknown): error is ValidatorError {
  return error instanceof ValidatorError;
}
