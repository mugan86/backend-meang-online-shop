import { IResolvers } from 'graphql-tools';
import { findElements } from '../../lib/db-operations';
import { COLLECTIONS } from '../../config/constants';
const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, __, { db }) {
            try {
                return {
                    status: true,
                    message: 'Lista de géneros correctamente cargada',
                    genres: await findElements(db, COLLECTIONS.GENRES)
                };
            } catch (error) {
                return {
                    status: false,
                    message: `Lista de géneros no cargada: ${ error }`,
                    genres: null
                };
            }
        }
    }
};

export default resolversGenreQuery;