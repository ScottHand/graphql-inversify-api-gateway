import { createConnection, getConnectionManager, Connection } from 'typeorm';
import { exception } from '../decorators/exceptionDecorator';
import { Logger } from '../logger';
import { InfrastructureError } from '../errors/infrastructureError';

/**
 * Rds provider. Provides DB connection for AuroraDB.
 */
export class RdsProvider {

  private connection: Connection;

  constructor(
    private config,
    private logger: Logger
  ) { }

  get getConnection() {
    return this.connection;
  }

  /**
   * Initializes the provider and opens connection to RDS SQL Database
   * @return {Promise<Connection>}
   */
  @exception(InfrastructureError)
  async createConnection(options) {
    const connectionOptions = Object.assign({}, this.config, options);
    this.logger.log(RdsProvider.name, createConnection.name, 'connectionOptions', connectionOptions);
    try {
      if ((this.connection) && !this.connection.isConnected) {
        await this.connection.connect();
        this.logger.log(RdsProvider.name, createConnection.name, `Reused existing connection: ${this.connection.name}`);
      } else {
        this.logger.log(RdsProvider.name, createConnection.name, 'dbConnection is empty. Creating a new connection');
        this.connection = await createConnection(connectionOptions);
        this.logger.log(RdsProvider.name, createConnection.name, `Created new connection: ${this.connection.name}`);
      }
    } catch (error) {
      if (error.name === 'AlreadyHasActiveConnectionError') {
        this.connection = getConnectionManager().get('default');
        this.logger.warn(RdsProvider.name, createConnection.name, `Created new connection: ${this.connection.name}`);
      } else {
        this.logger.error(RdsProvider.name, this.createConnection.name, JSON.stringify(error));
        throw error;
      }
    }
    return this.connection;
  }

  @exception(InfrastructureError)
  async closeConnection() {
    return this.connection.close();
  }
}
