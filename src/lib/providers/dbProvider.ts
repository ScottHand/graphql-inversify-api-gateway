import { Logger } from '../logger';
import { RdsProvider } from './rdsProvider';
import { SecretsService } from '../../services';
import { Entity } from 'typeorm';

export class DbProvider {
  constructor(
    private readonly config,
    private readonly logger: Logger,
    private readonly rdsProvider: RdsProvider,
    private readonly secretsService: SecretsService
  ) { }
  public async create(
    entities,
    database: string
  ) {
    try {
      const credentials = await this.secretsService.get(this.config.rdsSecretKey);
      const connectionOptions = {
        database,
        entities,
        ...credentials
      };
      this.logger.log(DbProvider.name, this.create.name, `Creating new DB connection to ${database}`);
      const connection = await this.rdsProvider.createConnection(connectionOptions);
      this.logger.log(DbProvider.name, this.create.name, `Created new DB connection to ${database}`);
      return connection;

    } catch (error) {
      this.logger.error(DbProvider.name, this.create.name, error);
      throw error;
    }
  }
}
