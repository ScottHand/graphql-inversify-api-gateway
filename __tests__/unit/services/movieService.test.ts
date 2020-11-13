import { Logger } from '../../../src/lib/logger';
import { MovieService } from '../../../src/services';
import typeorm = require('typeorm')
import { Movie } from '../../../src/entities/movie';

jest.mock('../../../src/lib/logger');
const loggerMock = new Logger();

describe.only('MovieService', () => {
  describe('getById', () => {
    it('should return a single movie', async () => {
      const expectedValue = {
        id: 1,
        title: 'title',
        description: 'description',
        releaseDate: '2020-10-01',
        createdBy: 'somebody',
        createdDate: '2020-09-01',
        updatedBy: 'somebodyelse',
        updatedDate: '2020-09-02',
      };

      const mockQuerybuilder = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue( expectedValue )
      });

      typeorm.getConnection = jest.fn().mockReturnValue({
        getRepository: jest.fn().mockReturnValue({createQueryBuilder: mockQuerybuilder})
      });

      const movieService = new MovieService(loggerMock);
      const result = await movieService.getById(1)

      expect(result).toEqual(expectedValue)

      const queryBuilder = typeorm.getConnection().getRepository(Movie).createQueryBuilder;
      expect(queryBuilder).toHaveBeenNthCalledWith(1, 'movie');
      expect(queryBuilder().where).toHaveBeenNthCalledWith(1, 'id = :id', { id: 1 });
      expect(queryBuilder().getOne).toHaveBeenNthCalledWith(1);
    });
  });
  describe('getAll', () => {
    it('should return list of movies', async () => {
      const expectedValue = [
        {
          id: 1,
          title: 'title',
          description: 'description',
          releaseDate: '2020-10-01',
          createdBy: 'somebody',
          createdDate: '2020-09-01',
          updatedBy: 'somebodyelse',
          updatedDate: '2020-09-02',
        },
        {
          id: 2,
          title: 'title2',
          description: 'description2',
          releaseDate: '2020-10-02',
          createdBy: 'somebody2',
          createdDate: '2020-09-02',
          updatedBy: 'somebodyelse2',
          updatedDate: '2020-09-03',
        }];

      const mockQuerybuilder = jest.fn().mockReturnValue({
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(expectedValue)
      });

      typeorm.getConnection = jest.fn().mockReturnValue({
        getRepository: jest.fn().mockReturnValue({createQueryBuilder: mockQuerybuilder})
      });

      const movieService = new MovieService(loggerMock);
      const result = await movieService.getAll();
      expect(result).toEqual(expectedValue);

      const queryBuilder = typeorm.getConnection().getRepository(Movie).createQueryBuilder;
      expect(queryBuilder).toHaveBeenNthCalledWith(1, 'movie');
      expect(queryBuilder().orderBy).toHaveBeenNthCalledWith(1, { title: 'ASC' });
      expect(queryBuilder().getMany).toHaveBeenNthCalledWith(1);
    });
  });
});