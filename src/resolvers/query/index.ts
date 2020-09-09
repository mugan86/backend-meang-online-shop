const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversUserQuery from './user';
import resolversShopProductsQuery from './shop-product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';
import queryStripeResolvers from './stripe';
import resolversDashboardQuery from './dashboard';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversShopProductsQuery,
    resolversGenreQuery,
    resolversTagQuery,
    // Stripe
    queryStripeResolvers,
    resolversDashboardQuery
]);

export default queryResolvers;