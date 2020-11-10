import { inject } from 'inversify';
import { TYPE } from '../config';
import { Connection } from 'typeorm/index';
import { InputArgumentsError } from '../lib/errors/inputArgumentError';
import { provide } from 'inversify-binding-decorators';

@provide(TYPE.BaseService)
export class BaseService {
  constructor(
    @inject(TYPE.Connection) protected connection?: Connection
  ) {}

  public async checkConnection() {
    if (this.connection && !this.connection.isConnected) {
      await this.connection.connect();
    }
  }

  public async closeConnection() {
    if (this.connection && !this.connection.isConnected) {
      await this.connection.close();
    }
  }

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