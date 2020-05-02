import GMR from 'graphql-merge-resolvers';
import resolversUserMutation from './user';
import resolversGenreMutation from './genre';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation
]);

export default mutationResolvers;