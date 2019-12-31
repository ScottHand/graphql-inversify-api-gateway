import { MovieRepository } from '../repositories/movieRepository';
import { inject } from 'inversify';
import { TYPE } from '../config/types';
import { provide } from 'inversify-binding-decorators';
import { ValidationService } from './validationService';
import { exception } from '../lib/decorators/exceptionDecorator';
import { InternalServerError } from '../lib/errors/internalServerError';
import { Logger } from '../lib/logger';
import { Movie } from '../entities/movie';

@provide(TYPE.MovieService)
export class MovieService extends ValidationService {
  constructor(@inject(TYPE.Logger) private logger: Logger,
              @inject(TYPE.MovieRepository) private movieRepository: MovieRepository) {
    super();
  }

  /**
   * get all movies
   */
  @exception(InternalServerError)
  async getAll() {
    return await this.movieRepository.find();
  }

  /**
   * get movie by id
   * @param id
   */
  @exception(InternalServerError)
  async getById(id: number): Promise<Movie> {
    try {
      this.validateIfExist({id});

      await this.movieRepository.checkConnection();
      this.logger.log(MovieService.name, this.getById.name, `id: ${id}`);

      const result = await this.movieRepository.findOne( {id});
      this.logger.log(MovieService.name, this.getById.name, `result`, result);
      return result;
    } catch (error) {
      this.logger.error(MovieService.name, this.getById.name, JSON.stringify(error));
      throw error;
    }
  }
}
