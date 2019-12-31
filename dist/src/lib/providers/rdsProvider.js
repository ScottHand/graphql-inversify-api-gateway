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
const typeorm_1 = require("typeorm");
const exceptionDecorator_1 = require("../decorators/exceptionDecorator");
const infrastructureError_1 = require("../errors/infrastructureError");
class RdsProvider {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    get getConnection() {
        return this.dbConnection;
    }
    async createConnection(options) {
        const connectionOptions = Object.assign({}, this.config, options);
        this.dbConnection = await typeorm_1.createConnection(connectionOptions);
        this.logger.log(RdsProvider.name, typeorm_1.createConnection.name, `Created new connection ${this.dbConnection.name}`);
        return this.dbConnection;
    }
    async closeConnection() {
        return await this.dbConnection.close();
    }
}
__decorate([
    exceptionDecorator_1.exception(infrastructureError_1.InfrastructureError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RdsProvider.prototype, "createConnection", null);
__decorate([
    exceptionDecorator_1.exception(infrastructureError_1.InfrastructureError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RdsProvider.prototype, "closeConnection", null);
exports.RdsProvider = RdsProvider;
//# sourceMappingURL=rdsProvider.js.map