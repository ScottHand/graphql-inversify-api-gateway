import { InfrastructureError } from '../errors/infrastructureError';
import { exception } from '../decorators/exceptionDecorator';
import { inject } from 'inversify';
import { TYPE } from '../../config';
import { Logger } from '../logger';
import AWS from 'aws-sdk';

/**
 * SecretsManager provider.  This is the adapter for AWS SecretsManager Client.
 */
export class SecretsManagerProvider {
  constructor(@inject(TYPE.Logger) private readonly logger: Logger,
              @inject(TYPE.SecretsManagerClient) private readonly secretsManager: AWS.SecretsManager) { }

  /**
   * Get secrets from AWS SecretsManager by id.
   * @param {string} id
   * @return {Promise<{username: {string}, password: {string}, host: {string}}>}
   */
  @exception(InfrastructureError)
  async getSecrets(id: string): Promise<{username: string, password: string, host: string}> {
    this.logger.log(SecretsManagerProvider.name, 'getSecrets', `id: ${id}`);
    return new Promise( (resolve, reject) => {
      const params = { SecretId: id };
      if (process.env.STAGE === 'LOCAL') {
        resolve(
          {
          username: process.env.LOCAL_DB_USERNAME,
          password: process.env.LOCAL_DB_PASSWORD,
          host: 'localhost'
        });
      } else {
        this.secretsManager.getSecretValue(params, (err, data) => {
          if (err) {
            const error = new InfrastructureError(`Get secrets failed. Params: ${JSON.stringify(params)}`, err);
            this.logger.error(SecretsManagerProvider.name, 'getSecrets', error);
            reject(error);
          } else {
            resolve(JSON.parse(data.SecretString));
          }
        });
      }
    });
  }
}
