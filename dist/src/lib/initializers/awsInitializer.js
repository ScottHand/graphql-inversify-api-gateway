"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.initializeAws = (config = {}) => {
    aws_sdk_1.default.config.update(config);
};
//# sourceMappingURL=awsInitializer.js.map