import { gql } from 'apollo-server-lambda';

export const MOVIE_QUERY = gql`
    type Query {
        movie(id: Int): Movie
        movies: [Movie]
    }
`;
