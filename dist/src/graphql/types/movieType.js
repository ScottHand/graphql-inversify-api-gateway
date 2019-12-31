"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
exports.MOVIE_TYPE = apollo_server_lambda_1.gql `
    type Movie {
        id: Int!,
        title: String!,
        description: String,
        releaseDate: Date,
        createdBy: String,
        updatedBy: String,
        createdDate: Date,
        updatedDate: Date,
    }
`;
//# sourceMappingURL=movieType.js.map