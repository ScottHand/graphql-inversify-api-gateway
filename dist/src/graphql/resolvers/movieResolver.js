"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieResolver = (movieService) => ({
    Query: {
        movie: async (_, { id }) => movieService.getById(id),
        movies: () => movieService.getAll()
    }
});
//# sourceMappingURL=movieResolver.js.map