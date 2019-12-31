import { gql } from 'apollo-server-lambda';

export const MOVIE_TYPE = gql`
    type Movie {
        id: Int!,
        title: String!,
        description: String,
        releaseDate: Date,
        createdBy: String,
        updatedBy: String,
        createdDate: Date,
        updatedDate: Date,
    }
`;
