"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const bindings_1 = require("./bindings");
function createContainer() {
    const c = new inversify_1.Container();
    c.load(inversify_binding_decorators_1.buildProviderModule());
    c.load(bindings_1.bindings);
    return c;
}
exports.createContainer = createContainer;
exports.container = createContainer();
//# sourceMappingURL=index.js.map