"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalServerError extends Error {
    constructor(cause) {
        super('Internal server error');
        this.cause = cause;
        this.name = this.constructor.name;
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=internalServerError.js.map