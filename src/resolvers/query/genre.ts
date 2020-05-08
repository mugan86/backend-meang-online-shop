import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';
import { pagination } from '../../lib/pagination';

const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, variables, { db }) {
            
            return new GenresService(_, {
                pagination: variables
            }, { db }).items();
        },
        async genre(_, { id }, { db }) {
            return new GenresService(_, { id }, { db }).details();
        }
    }
};

export default resolversGenreQuery;