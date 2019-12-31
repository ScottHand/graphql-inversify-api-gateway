import AWS from 'aws-sdk';
import AWSLambda from 'aws-lambda';
import { Logger } from './lib/logger';
import { SecretsService } from './services/secretsService';
import { container } from './ioc';
import { TYPE } from './config/types';
import { config } from './config/config';
import { initializeAws } from './lib/initializers/awsInitializer';
import { RdsProvider } from './lib/providers/rdsProvider';
import { createLambdaHandler } from './lib/factories/lambdaHandlerFactory';
import { Movie } from './entities/movie';
import { MovieService } from './services/movieService';
import { MovieRepository } from './repositories/movieRepository';
import { createRepository } from './lib/factories/respositoryFactory';
import { createGraphQlServerFactory } from './lib/factories/graphqlServerFactory';
import { MOVIE_QUERY } from './graphql/queries/userQuery';
import { MOVIE_TYPE } from './graphql/types/movieType';
import { createMovieResolver } from './graphql/resolvers/movieResolver';
import { DATE_TYPE } from './graphql/types/dateScalarType';

type LambdaHandler = AWSLambda.Handler<AWSLambda.SQSEvent, AWS.SQS.SendMessageResult[]>;

const logger: Logger = container.get<Logger>( TYPE.Logger );
const secretsService: SecretsService = container.get<SecretsService>( TYPE.SecretsService );
const rdsProvider: RdsProvider = container.get<RdsProvider>( TYPE.RdsProvider );

const serviceName = 'MovieService';

initializeAws( config.awsConfig );

export async function createGraphQlServer() {
  try {
    const { username, password, host } = await secretsService.get( process.env.SECRETS_MANAGER_KEY );

    const connection = await rdsProvider.createConnection( {
      host,
      username,
      password,
      database: process.env.DATABASE_NAME,
      entities: [ Movie ]
    } );

    const movieService = new MovieService( logger, createRepository( connection, MovieRepository ) );

    return createGraphQlServerFactory(
      logger, [ MOVIE_QUERY, MOVIE_TYPE, DATE_TYPE ], createMovieResolver( movieService )
    );
  } catch ( error ) {
    logger.error( serviceName, createGraphQlServer.name, error );
    throw error;
  }
}

export const handler: LambdaHandler = createLambdaHandler( logger, createGraphQlServer );
