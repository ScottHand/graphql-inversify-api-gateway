import { MovieService } from '../../services/movieService';

export const createMovieResolver = (movieService: MovieService) => ({
  Query: {
    movie: async (_, {id}) => movieService.getById(id),
    movies: () => movieService.getAll()
  }
});
