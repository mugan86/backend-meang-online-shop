import GMR from 'graphql-merge-resolvers';
import resolversUserQuery from './user';
import resolversShopProductsQuery from './shop-product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';
import queryStripeResolvers from './stripe';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversShopProductsQuery,
    resolversGenreQuery,
    resolversTagQuery,
    // Stripe
    queryStripeResolvers
]);

export default queryResolvers;