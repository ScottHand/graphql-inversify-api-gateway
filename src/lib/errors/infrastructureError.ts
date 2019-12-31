/**
 * InfrastructureError
 */
import { AWSError } from 'aws-sdk';

export class InfrastructureError extends Error {
  public statusCode: number;
  public retryable = false;
  public code: string;

  constructor(message, public cause?: AWSError) {
    super(`${message}. Cause: ${cause.message}`);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    this.retryable = this.cause.retryable;
    this.code = this.cause.code;
    this.statusCode = this.cause.statusCode;
    this.message = `Cause: ${cause.message}`;
    // This clips the constructor invocation from the stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}
