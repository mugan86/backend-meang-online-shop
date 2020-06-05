import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';

const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, { page, itemsPage, active}, { db }) {
            return new GenresService(_, {
                pagination: {page, itemsPage}
            }, { db }).items(active);
        },
        async genre(_, { id }, { db }) {
            return new GenresService(_, { id }, { db }).details();
        }
    }
};

export default resolversGenreQuery;