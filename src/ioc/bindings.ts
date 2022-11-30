import { ContainerModule, interfaces } from 'inversify';
import { TYPE, config, rdsConfig } from '../config';
import { createLogger } from '../lib/factories/loggerFactory';
import { createSecretsManagerProvider } from '../lib/factories/secretsManagerProviderFactory';
import { SecretsService } from '../services';
import { createRdsProvider } from '../lib/factories/rdsProviderFactory';
import AWS from 'aws-sdk';
import { createAppConfigProvider } from '../lib/factories/appConfigProviderFactory';
import { AppConfigParameters } from '../lib/interfaces/appConfigParameters';
import { AppConfigService } from '../services/appConfigService';

export const bindings = new ContainerModule((bind: interfaces.Bind) => {
  const logger = createLogger();
  const secretsManagerClient = new AWS.SecretsManager( { region: config.awsConfig.region } );
  const secretsManagerProvider = createSecretsManagerProvider(secretsManagerClient, logger);
  const rdsProvider = createRdsProvider(rdsConfig, logger);
  const secretsService = new SecretsService(logger, secretsManagerProvider);
  const appConfigParameters:AppConfigParameters = {
    ApplicationId: config.appConfigParameters.applicationId,
    EnvironmentId: config.appConfigParameters.environmentId,
    ConfigurationProfileId: config.appConfigParameters.configurationProfileId};
  const appConfigProvider = createAppConfigProvider(logger, appConfigParameters);
  const appConfigService = new AppConfigService(logger, appConfigProvider);

  bind(TYPE.Logger).toConstantValue(logger);
  bind(TYPE.Config).toConstantValue(config);
  bind(TYPE.RdsConfig).toConstantValue(rdsConfig);
  bind(TYPE.RdsProvider).toConstantValue(rdsProvider);
  bind(TYPE.SecretsManagerClient).toConstantValue(secretsManagerClient);
  bind(TYPE.SecretsManagerProvider).toConstantValue(secretsManagerProvider);
  bind(TYPE.SecretsService).toConstantValue(secretsService);
  bind(TYPE.AppConfigProvider).toConstantValue(appConfigProvider);
  bind(TYPE.AppConfigService).toConstantValue(appConfigService);

});
