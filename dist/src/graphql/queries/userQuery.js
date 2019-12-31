"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
exports.MOVIE_QUERY = apollo_server_lambda_1.gql `
    type Query {
        movie(id: Int): Movie
        movies: [Movie]
    }
`;
//# sourceMappingURL=userQuery.js.map