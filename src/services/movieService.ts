import { inject } from 'inversify';
import { TYPE } from '../config';
import { provide } from 'inversify-binding-decorators';
import { exception } from '../lib/decorators/exceptionDecorator';
import { InternalServerError } from '../lib/errors/internalServerError';
import { Logger } from '../lib/logger';
import { Movie } from '../entities/movie';
import { BaseService } from './baseService';
import { Connection } from 'typeorm/index';

@provide(TYPE.MovieService)
export class MovieService extends BaseService {
  constructor(
    @inject(TYPE.Logger) private logger: Logger,
    @inject(TYPE.Connection) protected connection: Connection) {
    super(connection);
  }

  /**
   * get all movies
   */
  @exception(InternalServerError)
  async getAll(): Promise<Movie[]> {
    try {
      await this.checkConnection();
      const result = await this.connection.getRepository(Movie).find();
      this.logger.log(MovieService.name, this.getAll.name, `result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(MovieService.name, this.getAll.name, JSON.stringify(error));
      throw error;
    } finally {
      await this.closeConnection();
    }
  }

  /**
   * get movie by id
   * @param id
   */
  @exception(InternalServerError)
  async getById(id: number): Promise<Movie> {
    try {
      this.validateIfExist({id});

      await this.checkConnection();
      this.logger.log(MovieService.name, this.getById.name, `id: ${id}`);

      const result = await this.connection.getRepository(Movie).findOne( {id});
      this.logger.log(MovieService.name, this.getById.name, `result`, result);
      return result;
    } catch (error) {
      this.logger.error(MovieService.name, this.getById.name, JSON.stringify(error));
      throw error;
    }
  }
}
