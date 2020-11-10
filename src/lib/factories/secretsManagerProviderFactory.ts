import AWS from 'aws-sdk';
import { SecretsManagerProvider } from '../providers/secretsManagerProvider';

export const createSecretsManagerProvider = (regionValue, logger): SecretsManagerProvider => {
  return new SecretsManagerProvider(logger, new AWS.SecretsManager({ region: regionValue }));
};
