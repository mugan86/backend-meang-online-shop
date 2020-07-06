import GMR from 'graphql-merge-resolvers';
import resolversUserMutation from './user';
import resolversGenreMutation from './genre';
import resolversTagMutation from './tag';
import resolversMailMutation from './email';
import mutationStripeResolvers from './stripe';
import resolversShopProductMutation from './shop-product';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation,
    resolversMailMutation,
    mutationStripeResolvers,
    resolversShopProductMutation
]);

export default mutationResolvers;