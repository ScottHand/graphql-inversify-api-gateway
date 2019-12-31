"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
exports.createGraphQlServerFactory = (logger, typeDefs, resolvers) => {
    const contextFunc = ({ event, context }) => ({
        context,
        headers: event.headers,
        functionName: context.functionName,
        event
    });
    const schema = apollo_server_lambda_1.makeExecutableSchema({
        typeDefs,
        resolvers
    });
    const server = new apollo_server_lambda_1.ApolloServer({
        schema,
        context: contextFunc,
        formatError: error => {
            logger.error('Factory', exports.createGraphQlServerFactory.name, error);
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
//# sourceMappingURL=graphqlServerFactory.js.map