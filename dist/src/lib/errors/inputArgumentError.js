"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
class InputArgumentsError extends apollo_server_lambda_1.UserInputError {
    constructor(invalidArgs) {
        super('Incorrect parameter', { invalidArgs });
        this.invalidArgs = invalidArgs;
    }
}
exports.InputArgumentsError = InputArgumentsError;
//# sourceMappingURL=inputArgumentError.js.map