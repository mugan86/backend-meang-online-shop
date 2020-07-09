import GMR from 'graphql-merge-resolvers';
import resolverShopProductSubscription from './shop-product';
const subscriptionResolvers = GMR.merge([
    resolverShopProductSubscription
]);

export default subscriptionResolvers;