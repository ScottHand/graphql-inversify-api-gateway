import { SecretsService } from '../../services/secretsService';
import { RdsProvider } from '../providers/rdsProvider';
import { Logger } from '../logger';
import { createGraphQlServerFactory } from './graphqlServerFactory';

export class RdsGraphQlServerFactory {
  constructor(private logger: Logger, private rdsProvider: RdsProvider, private secretsService: SecretsService) {

  }

  async create(dbName, entites, secretsKey, createResolver, graphQlTypes) {
    try {
      const {username, password, host} = await this.secretsService.get(secretsKey);

      const connection = await this.rdsProvider.createConnection({
          host,
          username,
          password,
          database: dbName,
          entities: entites
        }
      );

      return createGraphQlServerFactory(
        this.logger,
        graphQlTypes,
        createResolver(connection)
      );
    } catch (error) {
      this.logger.error(RdsGraphQlServerFactory.name, this.create.name, error);
      throw error;
    }
  }
}
