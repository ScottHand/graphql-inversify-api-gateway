"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructureError_1 = require("../errors/infrastructureError");
const exceptionDecorator_1 = require("../decorators/exceptionDecorator");
class SecretsManagerProvider {
    constructor(logger, secretsManager) {
        this.logger = logger;
        this.secretsManager = secretsManager;
    }
    async getSecrets(id) {
        this.logger.log(SecretsManagerProvider.name, this.getSecrets.name, `id: ${id}`);
        return new Promise((resolve, reject) => {
            const params = { SecretId: id };
            this.secretsManager.getSecretValue(params, (err, data) => {
                if (err) {
                    const error = new infrastructureError_1.InfrastructureError(`Get secrets failed. Params: ${JSON.stringify(params)}`, err);
                    this.logger.error(SecretsManagerProvider.name, this.getSecrets.name, error);
                    reject(error);
                }
                else {
                    resolve(JSON.parse(data.SecretString));
                }
            });
        });
    }
}
__decorate([
    exceptionDecorator_1.exception(infrastructureError_1.InfrastructureError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SecretsManagerProvider.prototype, "getSecrets", null);
exports.SecretsManagerProvider = SecretsManagerProvider;
//# sourceMappingURL=secretsManagerProvider.js.map