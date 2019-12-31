import { InputArgumentsError } from '../lib/errors/inputArgumentError';

export class ValidationService {
  /**
   * validates if an array of parameters exists within an object
   * @param parameters
   */
  validateIfExist(parameters: { [key: string]: any }) {
    const invalidArguments = {};
    for (const [name, value] of Object.entries(parameters)) {
      if (!value) {
        invalidArguments[name] = value;
      }
    }

    if (Object.keys(invalidArguments).length) {
      throw new InputArgumentsError(invalidArguments);
    }
  }
}
