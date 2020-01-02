import { TYPE } from '../../../src/config/types';
import { container } from '../../../src/ioc';
import { Logger } from '../../../src/lib/logger';
import { EntityManager, EntityMetadata } from 'typeorm';
import { MovieRepository } from '../../../src/repositories/movieRepository';
import { MovieService } from '../../../src/services/movieService';

jest.mock('apollo-server-lambda');
jest.mock('../../../src/repositories/movieRepository');
jest.mock('../../../src/ioc');

const loggerMock: Logger = container.get<Logger>(TYPE.Logger);
const manager = {} as EntityManager;
const metadata = {} as EntityMetadata;

describe.only('MovieService', () => {
  describe('getAll', () => {
    const movieRepository = new MovieRepository(manager, metadata);
    const movieService = new MovieService(loggerMock, movieRepository);
    const checkConnection = jest.spyOn(movieRepository, 'checkConnection');

    it('should return a list of movies', async () => {
      const findMovieRepositorySpy = jest.spyOn(movieRepository, 'find');
      await movieService.getAll();
      // expect(checkConnection).toHaveBeenCalled();
      expect(findMovieRepositorySpy).toHaveBeenCalled();
    });
  });
});
