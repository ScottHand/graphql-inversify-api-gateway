"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domainError.js.map