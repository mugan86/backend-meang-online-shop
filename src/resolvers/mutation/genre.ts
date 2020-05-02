import { IResolvers } from 'graphql-tools';
import GenresService from '../../services/genres.service';


const resolversGenreMutation : IResolvers = {
    Mutation: {
        async addGenre(_, { genre }, { db }) {
            return new GenresService(_, { genre }, {db}).insert();
        }
    }
};

export default resolversGenreMutation;