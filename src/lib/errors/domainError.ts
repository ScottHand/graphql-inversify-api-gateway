/**
 * DomainError
 */
export class DomainError extends Error {
  constructor(message, public cause?: Error) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}
