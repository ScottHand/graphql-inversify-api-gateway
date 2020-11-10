import { Stages } from '../constants';

/**
 * InternalError
 */
export class InternalServerError extends Error {
  constructor(public cause?: Error) {
    super('Internal server error' + process.env.STAGE !== Stages.PROD ? JSON.stringify(cause) : '');
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
  }
}
