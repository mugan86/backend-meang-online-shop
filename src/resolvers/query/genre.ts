import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';
import { findOneElement } from '../../lib/db-operations';
import { COLLECTIONS } from '../../config/constants';
const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, __, { db }) {
            return new GenresService(_, __, { db }).items();
        },
        async genre(_, { id }, { db }) {
            return {
                status: true,
                message: `Género ${id} seleccionado correctamente`,
                genre: await findOneElement(db, COLLECTIONS.GENRES, { id })
            };
        }
    }
};

export default resolversGenreQuery;