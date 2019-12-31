"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecretsService {
    constructor(logger, secretManagerProvider) {
        this.logger = logger;
        this.secretManagerProvider = secretManagerProvider;
        this.secrets = {};
    }
    async get(secretId) {
        this.logger.log(SecretsService.name, this.get.name, `id: ${secretId}`);
        if (!this.secrets[secretId]) {
            const { username, password, host } = await this.secretManagerProvider.getSecrets(secretId);
            this.logger.log(SecretsService.name, this.get.name, `caching data from secretManagerProvider getSecrets`);
            this.secrets[secretId] = { username, password, host };
        }
        this.logger.log(SecretsService.name, this.get.name, `using cached data instead of secretManagerProvider getSecrets`);
        return Promise.resolve(this.secrets[secretId]);
    }
}
exports.SecretsService = SecretsService;
//# sourceMappingURL=secretsService.js.map