import { createLogger } from '../factories/loggerFactory';
import { InfrastructureError } from '../errors/infrastructureError';

/**
 * Exception decorator for error catching and logging.
 * @param t - error type/constructor
 * @param options - {sync: false} by default. Define sync/async flow execution
 */
export const exception = <T>(t: new (...args: any[]) => Error, options = {sync: false}): MethodDecorator => {
  t = t || InfrastructureError;

  const logger = createLogger();

  function handlerError(className, propertyKey, err) {
    const error = new t(t.name, err);

    logger.error(className, propertyKey, error);
    throw error;
  }

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    const className = target.constructor.name;

    if (options.sync) {
      descriptor.value = function(this: any, ...args: any[]) {
        try {
          return method.apply(this, args);
        } catch (err) {
          handlerError(className, propertyKey, err);
        }
      };
    } else {
      descriptor.value = async function(this: any, ...args: any[]) {
        try {
          return await method.apply(this, args);
        } catch (err) {
          handlerError(className, propertyKey, err);
        }
      };
    }

    return descriptor;
  };
};
