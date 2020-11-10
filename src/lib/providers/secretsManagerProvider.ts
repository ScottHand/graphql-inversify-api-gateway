import { InfrastructureError } from '../errors/infrastructureError';
import { exception } from '../decorators/exceptionDecorator';

/**
 * SecretsManager provider.  This is the adapter for AWS SecretsManager Client.
 */
export class SecretsManagerProvider {
  constructor(private logger, private secretsManager) { }

  /**
   * Get secrets from AWS SecretsManager by id.
   * @param {string} id
   * @return {Promise<{username: {string}, password: {string}, host: {string}}>}
   */
  @exception(InfrastructureError)
  async getSecrets(id: string): Promise<{username: string, password: string, host: string}> {
    this.logger.log(SecretsManagerProvider.name, this.getSecrets.name, `id: ${id}`);
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
            this.logger.error(SecretsManagerProvider.name, this.getSecrets.name, error);
            reject(error);
          } else {
            resolve(JSON.parse(data.SecretString));
          }
        });
      }
    });
  }
}
