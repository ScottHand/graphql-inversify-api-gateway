import { inject } from 'inversify';
import { TYPE } from '../config';
import { provide } from 'inversify-binding-decorators';
import { exception } from '../lib/decorators/exceptionDecorator';
import { InternalServerError } from '../lib/errors/internalServerError';
import { Logger } from '../lib/logger';
import { Movie } from '../entities/movie';
import { BaseService } from './baseService';
import { getConnection, createQueryBuilder, getRepository } from 'typeorm';

@provide(TYPE.MovieService)
export class MovieService extends BaseService {
  constructor(
    @inject(TYPE.Logger) private logger: Logger) {
    super();
  }

  /**
   * get all movies
   */
  @exception(InternalServerError)
  async getAll(): Promise<Movie[]> {
    try {
      await this.checkConnection();

      return await getConnection()
        .getRepository(Movie)
        .createQueryBuilder('movie')
        .orderBy( { title: 'ASC'})
        .getMany();
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

      return await getConnection()
        .getRepository(Movie)
        .createQueryBuilder('movie')
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch (error) {
      this.logger.error(MovieService.name, this.getById.name, JSON.stringify(error));
      throw error;
    }
  }
}