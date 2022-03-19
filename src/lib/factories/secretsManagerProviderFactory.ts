import AWS from 'aws-sdk';
import { Logger } from '../logger';
import { SecretsManagerProvider } from '../providers/secretsManagerProvider';

export const createSecretsManagerProvider = (secretsManagerClient: AWS.SecretsManager, logger: Logger): SecretsManagerProvider => {
  return new SecretsManagerProvider(logger, secretsManagerClient);
};
