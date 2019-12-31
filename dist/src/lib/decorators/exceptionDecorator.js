"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerFactory_1 = require("../factories/loggerFactory");
const infrastructureError_1 = require("../errors/infrastructureError");
exports.exception = (t, options = { sync: false }) => {
    t = t || infrastructureError_1.InfrastructureError;
    const logger = loggerFactory_1.createLogger();
    function handlerError(className, propertyKey, err) {
        const error = new t(t.name, err);
        logger.error(className, propertyKey, error);
        throw error;
    }
    return (target, propertyKey, descriptor) => {
        const method = descriptor.value;
        const className = target.constructor.name;
        if (options.sync) {
            descriptor.value = function (...args) {
                try {
                    return method.apply(this, args);
                }
                catch (err) {
                    handlerError(className, propertyKey, err);
                }
            };
        }
        else {
            descriptor.value = async function (...args) {
                try {
                    return await method.apply(this, args);
                }
                catch (err) {
                    handlerError(className, propertyKey, err);
                }
            };
        }
        return descriptor;
    };
};
//# sourceMappingURL=exceptionDecorator.js.map