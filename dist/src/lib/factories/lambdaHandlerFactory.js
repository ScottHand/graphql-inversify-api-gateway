"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let server;
exports.createLambdaHandler = (logger, createGraphQlServer) => ((event, context, callback) => {
    logger.log('Lib', exports.createLambdaHandler.name, 'Event', event);
    if (server) {
        logger.log('Lib', exports.createLambdaHandler.name, 'Used cached GraphQl Server');
        server(event, context, callback);
    }
    else {
        createGraphQlServer().then(handler => {
            logger.log('Lib', exports.createLambdaHandler.name, 'Created new GraphQl Server');
            server = handler;
            server(event, context, callback);
        }).catch(error => callback(error));
    }
});
//# sourceMappingURL=lambdaHandlerFactory.js.map