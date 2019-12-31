"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputArgumentError_1 = require("../lib/errors/inputArgumentError");
class ValidationService {
    validateIfExist(parameters) {
        const invalidArguments = {};
        for (const [name, value] of Object.entries(parameters)) {
            if (!value) {
                invalidArguments[name] = value;
            }
        }
        if (Object.keys(invalidArguments).length) {
            throw new inputArgumentError_1.InputArgumentsError(invalidArguments);
        }
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=validationService.js.map