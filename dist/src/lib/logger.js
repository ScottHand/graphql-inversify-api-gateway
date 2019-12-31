"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    log(className, methodName, message, data) {
        const dataString = data ? `:\n${JSON.stringify(data)}` : '';
        console.log(`[INFO][${className}:${methodName} ${message} ${dataString}`);
    }
    error(className, methodName, message) {
        console.log(`[ERROR][${className}:${methodName}] ${message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map