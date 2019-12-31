import { ContainerModule, interfaces } from 'inversify';
import { TYPE } from '../config/types';
import { config } from '../config/config';
import { rdsConfig } from '../config/rds';
import { createLogger } from '../lib/factories/loggerFactory';
import { createSecretsManagerProvider } from '../lib/factories/secretsManagerProviderFactory';
import { SecretsService } from '../services/secretsService';
import { RdsGraphQlServerFactory } from '../lib/factories/rdsGraphQLServerFactory';
import { createRdsProvider } from '../lib/factories/rdsProviderFactory';

export const bindings = new ContainerModule((bind: interfaces.Bind) => {
  const logger = createLogger();
  const secretManagerProvider = createSecretsManagerProvider(config.awsConfig.region, logger);
  const rdsProvider = createRdsProvider(rdsConfig, logger);
  const secretsService = new SecretsService(logger, secretManagerProvider);
  const rdsGraphQlServerFactory = new RdsGraphQlServerFactory(logger, rdsProvider, secretsService);

  bind(TYPE.Logger).toConstantValue(logger);
  bind(TYPE.Config).toConstantValue(config);
  bind(TYPE.RdsConfig).toConstantValue(rdsConfig);
  bind(TYPE.RdsProvider).toConstantValue(rdsProvider);
  bind(TYPE.SecretsManagerProvider).toConstantValue(secretManagerProvider);
  bind(TYPE.SecretsService).toConstantValue(secretsService);
  bind(TYPE.RdsGraphQlServerFactory).toConstantValue(rdsGraphQlServerFactory);
});
