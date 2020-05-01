import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';
const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, __, { db }) {
            return new GenresService(_, __, { db }).items();
        }
    }
};

export default resolversGenreQuery;