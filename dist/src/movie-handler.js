"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_1 = require("./ioc");
const types_1 = require("./config/types");
const config_1 = require("./config/config");
const awsInitializer_1 = require("./lib/initializers/awsInitializer");
const lambdaHandlerFactory_1 = require("./lib/factories/lambdaHandlerFactory");
const movie_1 = require("./entities/movie");
const movieService_1 = require("./services/movieService");
const movieRepository_1 = require("./repositories/movieRepository");
const respositoryFactory_1 = require("./lib/factories/respositoryFactory");
const graphqlServerFactory_1 = require("./lib/factories/graphqlServerFactory");
const userQuery_1 = require("./graphql/queries/userQuery");
const movieType_1 = require("./graphql/types/movieType");
const movieResolver_1 = require("./graphql/resolvers/movieResolver");
const dateScalarType_1 = require("./graphql/types/dateScalarType");
const logger = ioc_1.container.get(types_1.TYPE.Logger);
const secretsService = ioc_1.container.get(types_1.TYPE.SecretsService);
const rdsProvider = ioc_1.container.get(types_1.TYPE.RdsProvider);
const serviceName = 'MovieService';
awsInitializer_1.initializeAws(config_1.config.awsConfig);
async function createGraphQlServer() {
    try {
        const { username, password, host } = await secretsService.get(process.env.SECRETS_MANAGER_KEY);
        const connection = await rdsProvider.createConnection({
            host,
            username,
            password,
            database: process.env.DATABASE_NAME,
            entities: [movie_1.Movie]
        });
        const movieService = new movieService_1.MovieService(logger, respositoryFactory_1.createRepository(connection, movieRepository_1.MovieRepository));
        return graphqlServerFactory_1.createGraphQlServerFactory(logger, [userQuery_1.MOVIE_QUERY, movieType_1.MOVIE_TYPE, dateScalarType_1.DATE_TYPE], movieResolver_1.createMovieResolver(movieService));
    }
    catch (error) {
        logger.error(serviceName, createGraphQlServer.name, error);
        throw error;
    }
}
exports.createGraphQlServer = createGraphQlServer;
exports.handler = lambdaHandlerFactory_1.createLambdaHandler(logger, createGraphQlServer);
//# sourceMappingURL=movie-handler.js.map