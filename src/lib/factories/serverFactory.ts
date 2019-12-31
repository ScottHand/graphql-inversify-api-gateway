import { ALL_ENTITITES } from '../../entities/entities';
import { container } from '../../ioc';
import { TYPE } from '../../config/types';
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
      process.env.DATABASE_NAME,
      ALL_ENTITITES,
      process.env.SECRETS_MANAGER_KEY,
      createGraphQlResolver,
      graphQlTypes
    );
  } catch (error) {
    logger.error('Factory', createRdsGraphQlServer.name, error);
    throw error;
  }
}
