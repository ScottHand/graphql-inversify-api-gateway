"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const config_1 = require("../config/config");
const rds_1 = require("../config/rds");
const loggerFactory_1 = require("../lib/factories/loggerFactory");
const secretsManagerProviderFactory_1 = require("../lib/factories/secretsManagerProviderFactory");
const secretsService_1 = require("../services/secretsService");
const rdsGraphQLServerFactory_1 = require("../lib/factories/rdsGraphQLServerFactory");
const rdsProviderFactory_1 = require("../lib/factories/rdsProviderFactory");
exports.bindings = new inversify_1.ContainerModule((bind) => {
    const logger = loggerFactory_1.createLogger();
    const secretManagerProvider = secretsManagerProviderFactory_1.createSecretsManagerProvider(config_1.config.awsConfig.region, logger);
    const rdsProvider = rdsProviderFactory_1.createRdsProvider(rds_1.rdsConfig, logger);
    const secretsService = new secretsService_1.SecretsService(logger, secretManagerProvider);
    const rdsGraphQlServerFactory = new rdsGraphQLServerFactory_1.RdsGraphQlServerFactory(logger, rdsProvider, secretsService);
    bind(types_1.TYPE.Logger).toConstantValue(logger);
    bind(types_1.TYPE.Config).toConstantValue(config_1.config);
    bind(types_1.TYPE.RdsConfig).toConstantValue(rds_1.rdsConfig);
    bind(types_1.TYPE.RdsProvider).toConstantValue(rdsProvider);
    bind(types_1.TYPE.SecretsManagerProvider).toConstantValue(secretManagerProvider);
    bind(types_1.TYPE.SecretsService).toConstantValue(secretsService);
    bind(types_1.TYPE.RdsGraphQlServerFactory).toConstantValue(rdsGraphQlServerFactory);
});
//# sourceMappingURL=bindings.js.map