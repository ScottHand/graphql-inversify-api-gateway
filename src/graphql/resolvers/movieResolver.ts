import { MovieService } from '../../services';

export const createMovieResolver = (movieService: MovieService) => {
  return ( {
    Query: {
      movie: async ( _, { id } ) => movieService.getById( id ),
      movies: () => movieService.getAll()
    }
  } );
};
