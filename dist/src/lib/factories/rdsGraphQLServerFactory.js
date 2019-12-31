"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlServerFactory_1 = require("./graphqlServerFactory");
class RdsGraphQlServerFactory {
    constructor(logger, rdsProvider, secretsService) {
        this.logger = logger;
        this.rdsProvider = rdsProvider;
        this.secretsService = secretsService;
    }
    async create(dbName, entites, secretsKey, createResolver, graphQlTypes) {
        try {
            const { username, password, host } = await this.secretsService.get(secretsKey);
            const connection = await this.rdsProvider.createConnection({
                host,
                username,
                password,
                database: dbName,
                entities: entites
            });
            return graphqlServerFactory_1.createGraphQlServerFactory(this.logger, graphQlTypes, createResolver(connection));
        }
        catch (error) {
            this.logger.error(RdsGraphQlServerFactory.name, this.create.name, error);
            throw error;
        }
    }
}
exports.RdsGraphQlServerFactory = RdsGraphQlServerFactory;
//# sourceMappingURL=rdsGraphQLServerFactory.js.map