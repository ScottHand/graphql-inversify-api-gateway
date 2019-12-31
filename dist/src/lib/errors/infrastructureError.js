"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfrastructureError extends Error {
    constructor(message, cause) {
        super(`${message}. Cause: ${cause.message}`);
        this.cause = cause;
        this.retryable = false;
        this.name = this.constructor.name;
        this.retryable = this.cause.retryable;
        this.code = this.cause.code;
        this.statusCode = this.cause.statusCode;
        this.message = `Cause: ${cause.message}`;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InfrastructureError = InfrastructureError;
//# sourceMappingURL=infrastructureError.js.map