/**
 * The cached Lambda function handler - GraphQl Server
 */
let server;

export const createLambdaHandler = (logger, createGraphQlServer) => ((event, context, callback) => {
    logger.log('Lib', createLambdaHandler.name, 'Event', event);

    if (server) {
      logger.log('Lib', createLambdaHandler.name, 'Used cached GraphQl Server');
      server(event, context, callback);
    } else {
      createGraphQlServer().then(handler => {
        logger.log('Lib', createLambdaHandler.name, 'Created new GraphQl Server');
        server = handler;
        server(event, context, callback);
      }).catch(error => callback(error));
    }
  }
);
