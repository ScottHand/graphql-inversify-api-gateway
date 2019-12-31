import { UserInputError } from 'apollo-server-lambda';

/**
 * InputArgumentsError
 */
export class InputArgumentsError extends UserInputError {
  constructor(public invalidArgs) {
    super('Incorrect parameter', {invalidArgs});
  }
}
