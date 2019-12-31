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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MovieService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const movieRepository_1 = require("../repositories/movieRepository");
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const validationService_1 = require("./validationService");
const exceptionDecorator_1 = require("../lib/decorators/exceptionDecorator");
const internalServerError_1 = require("../lib/errors/internalServerError");
const logger_1 = require("../lib/logger");
let MovieService = MovieService_1 = class MovieService extends validationService_1.ValidationService {
    constructor(logger, movieRepository) {
        super();
        this.logger = logger;
        this.movieRepository = movieRepository;
    }
    async getAll() {
        return await this.movieRepository.find();
    }
    async getById(id) {
        try {
            this.validateIfExist({ id });
            await this.movieRepository.checkConnection();
            this.logger.log(MovieService_1.name, this.getById.name, `id: ${id}`);
            const result = await this.movieRepository.findOne({ id });
            this.logger.log(MovieService_1.name, this.getById.name, `result`, result);
            return result;
        }
        catch (error) {
            this.logger.error(MovieService_1.name, this.getById.name, JSON.stringify(error));
            throw error;
        }
    }
};
__decorate([
    exceptionDecorator_1.exception(internalServerError_1.InternalServerError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieService.prototype, "getAll", null);
__decorate([
    exceptionDecorator_1.exception(internalServerError_1.InternalServerError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieService.prototype, "getById", null);
MovieService = MovieService_1 = __decorate([
    inversify_binding_decorators_1.provide(types_1.TYPE.MovieService),
    __param(0, inversify_1.inject(types_1.TYPE.Logger)),
    __param(1, inversify_1.inject(types_1.TYPE.MovieRepository)),
    __metadata("design:paramtypes", [logger_1.Logger,
        movieRepository_1.MovieRepository])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movieService.js.map