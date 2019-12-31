"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const secretsManagerProvider_1 = require("../providers/secretsManagerProvider");
exports.createSecretsManagerProvider = (regionValue, logger) => {
    return new secretsManagerProvider_1.SecretsManagerProvider(logger, new aws_sdk_1.default.SecretsManager({ region: regionValue }));
};
//# sourceMappingURL=secretsManagerProviderFactory.js.map