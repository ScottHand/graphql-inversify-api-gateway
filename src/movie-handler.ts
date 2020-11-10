import AWS from 'aws-sdk';
import AWSLambda from 'aws-lambda';
import { Logger } from './lib/logger';
import { SecretsService, MovieService } from './services';
import { container } from './ioc';
import { TYPE } from './config';
import { initializeAws } from './lib/initializers/awsInitializer';
import { RdsProvider } from './lib/providers/rdsProvider';
import { createLambdaHandler } from './lib/factories/lambdaHandlerFactory';
import { ALL_ENTITIES } from './entities/entities';
import { createGraphQlServerFactory } from './lib/factories/graphqlServerFactory';
import { MOVIE_QUERY } from './graphql/queries/movieQuery';
import { MOVIE_TYPE } from './graphql/types/movieType';
import { createMovieResolver } from './graphql/resolvers/movieResolver';
import { DATE_TYPE } from './graphql/types/dateScalarType';

type LambdaHandler = AWSLambda.Handler<AWSLambda.SQSEvent, AWS.SQS.SendMessageResult[]>;

// const container = createContainer();
const config = container.get<any>(TYPE.Config);
const logger: Logger = container.get<Logger>( TYPE.Logger );
const secretsService: SecretsService = container.get<SecretsService>( TYPE.SecretsService );
const rdsProvider: RdsProvider = container.get<RdsProvider>( TYPE.RdsProvider );

const serviceName = 'MovieService';

initializeAws( config.awsConfig );

const graphQlTypes = [
  MOVIE_QUERY,
  MOVIE_TYPE,
  DATE_TYPE
]

export async function createGraphQlServer() {
  try {
    const { username, password, host } = await secretsService.get( config.rdsSecretsKey );

    const connection = await rdsProvider.createConnection( {
      host,
      username,
      password,
      database: config.databaseName,
      entities: ALL_ENTITIES
    } );

    // container.get<MovieService>(TYPE.MovieService)
    container.bind(TYPE.Connection).toConstantValue(connection);
    // container.bind(TYPE.MovieService).toConstructor<MovieService>(MovieService);
    // container.resolve(TYPE.MovieService).to(MovieService)
    // const movieService = new MovieService(logger, connection);

    return createGraphQlServerFactory(
      logger,
      graphQlTypes,
      [
        createMovieResolver(
          container.get<MovieService>(TYPE.MovieService)
      )]
    );
  } catch ( error ) {
    logger.error( serviceName, createGraphQlServer.name, error );
    throw error;
  }
}

export const handler: LambdaHandler = createLambdaHandler( logger, createGraphQlServer );
