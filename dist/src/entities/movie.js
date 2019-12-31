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
let Movie = class Movie {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: 'id' }),
    __metadata("design:type", Number)
], Movie.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'title', nullable: false }),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ name: 'description' }),
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'release_date' }),
    __metadata("design:type", String)
], Movie.prototype, "releaseDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'created_by', nullable: false }),
    __metadata("design:type", String)
], Movie.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column({ name: 'created_date', nullable: false }),
    __metadata("design:type", Date)
], Movie.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'updated_by', nullable: false }),
    __metadata("design:type", String)
], Movie.prototype, "updatedBy", void 0);
__decorate([
    typeorm_1.Column({ name: 'updated_date', nullable: true }),
    __metadata("design:type", Date)
], Movie.prototype, "updatedDate", void 0);
Movie = __decorate([
    typeorm_1.Entity('movie')
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movie.js.map