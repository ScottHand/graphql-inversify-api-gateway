import { Movie } from '../entities/movie';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from './baseRepository';

@EntityRepository(Movie)
export class MovieRepository extends BaseRepository<Movie> {

}
