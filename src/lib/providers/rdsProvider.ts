import { createConnection } from 'typeorm';
import { exception } from '../decorators/exceptionDecorator';
import { Logger } from '../logger';
import { InfrastructureError } from '../errors/infrastructureError';

/**
 * Rds provider. Provides DB connection for AuroraDB.
 */
export class RdsProvider {

  dbConnection: any;

  constructor(private config, private logger: Logger) {
  }

  get getConnection() {
    return this.dbConnection;
  }

  /**
   * Initializes the provider and opens connection to RDS SQL Database
   * @return {Promise<void>}
   */
  @exception(InfrastructureError)
  async createConnection(options) {
    const connectionOptions = Object.assign({}, this.config, options);

    this.dbConnection = await createConnection(connectionOptions);

    this.logger.log(RdsProvider.name, createConnection.name, `Created new connection ${this.dbConnection.name}`);

    return this.dbConnection;
  }

  @exception(InfrastructureError)
  async closeConnection() {
    return await this.dbConnection.close();
  }
}
