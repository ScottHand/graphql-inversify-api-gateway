"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../entities/entities");
const ioc_1 = require("../../ioc");
const types_1 = require("../../config/types");
const rdsGraphQlServerFactory = ioc_1.container.get(types_1.TYPE.RdsGraphQlServerFactory);
const logger = ioc_1.container.get(types_1.TYPE.Logger);
async function createRdsGraphQlServer(graphQlTypes, createGraphQlResolver) {
    try {
        return await rdsGraphQlServerFactory.create(process.env.DATABASE_NAME, entities_1.ALL_ENTITITES, process.env.SECRETS_MANAGER_KEY, createGraphQlResolver, graphQlTypes);
    }
    catch (error) {
        logger.error('Factory', createRdsGraphQlServer.name, error);
        throw error;
    }
}
exports.createRdsGraphQlServer = createRdsGraphQlServer;
//# sourceMappingURL=serverFactory.js.map