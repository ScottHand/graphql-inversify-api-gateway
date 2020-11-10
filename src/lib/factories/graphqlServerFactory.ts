import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';
import { Logger } from '../logger';

export const createGraphQlServerFactory = (
  logger: Logger,
  typeDefs,
  resolvers
) => {

  const contextFunc = ({event, context}) => ({
    context,
    headers: event.headers,
    functionName: context.functionName,
    event
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const server = new ApolloServer({
    schema,
    context: contextFunc,
    playground: true,
    introspection: true,
    formatError: error => {
      logger.error('Factory', createGraphQlServerFactory.name, error);
      // @ts-ignore
      delete error.extensions;
      return error;
    }
  });

  return server.createHandler({
    cors: {
      origin: '*'
    },
  });
};
