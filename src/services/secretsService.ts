import { Logger } from '../lib/logger';
import { SecretsManagerProvider } from '../lib/providers/secretsManagerProvider';

export class SecretsService {
  private secrets = {};

  constructor(private readonly logger: Logger,
              private readonly secretManagerProvider: SecretsManagerProvider) {
  }

  /**
   * Get secret manager values by key id
   * @param secretId
   */
  async get(secretId: string): Promise<{ username: string, password: string, host: string }> {
    this.logger.log(SecretsService.name, this.get.name, `id: ${secretId}`);
    if (!this.secrets[secretId]) {
      const {username, password, host} = await this.secretManagerProvider.getSecrets(secretId);
      this.logger.log(SecretsService.name, this.get.name,
        `caching data from secretManagerProvider getSecrets`);
      this.secrets[secretId] = {username, password, host};
    }
    this.logger.log(SecretsService.name, this.get.name,
      `using cached data instead of secretManagerProvider getSecrets`);
    return Promise.resolve(this.secrets[secretId]);
  }
}
