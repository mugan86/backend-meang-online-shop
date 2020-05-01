import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';

const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, __, { db }) {
            return new GenresService(_, __, { db }).items();
        },
        async genre(_, { id }, { db }) {
            return new GenresService(_, { id }, { db }).details();
        }
    }
};

export default resolversGenreQuery;