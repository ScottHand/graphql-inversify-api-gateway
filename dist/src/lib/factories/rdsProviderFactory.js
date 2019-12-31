"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdsProvider_1 = require("../providers/rdsProvider");
exports.createRdsProvider = (config, logger) => {
    return new rdsProvider_1.RdsProvider(config, logger);
};
//# sourceMappingURL=rdsProviderFactory.js.map