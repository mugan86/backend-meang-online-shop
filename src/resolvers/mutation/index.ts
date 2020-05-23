import GMR from 'graphql-merge-resolvers';
import resolversUserMutation from './user';
import resolversGenreMutation from './genre';
import resolversTagMutation from './tag';
import resolversMailMutation from './email';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation,
    resolversMailMutation
]);

export default mutationResolvers;