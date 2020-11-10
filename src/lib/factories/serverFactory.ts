import { ALL_ENTITIES } from '../../entities/entities';
import { container } from '../../ioc';
import { TYPE, config } from '../../config';
import { Logger } from '../logger';
import { RdsGraphQlServerFactory } from './rdsGraphQLServerFactory';

const rdsGraphQlServerFactory: RdsGraphQlServerFactory = container.get<RdsGraphQlServerFactory>(TYPE.RdsGraphQlServerFactory);
const logger: Logger = container.get<Logger>(TYPE.Logger);

/**
 * GraphQL Server event handler factory
 */
export async function createRdsGraphQlServer(graphQlTypes, createGraphQlResolver) {
  try {
    return await rdsGraphQlServerFactory.create(
      config.databaseName,
      ALL_ENTITIES,
      config.rdsSecretsKey,
      createGraphQlResolver,
      graphQlTypes
    );
  } catch (error) {
    logger.error('Factory', createRdsGraphQlServer.name, error);
    throw error;
  }
}
