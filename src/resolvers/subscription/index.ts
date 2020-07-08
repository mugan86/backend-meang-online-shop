import GMR from 'graphql-merge-resolvers';
import resolversShopProductsSubscription from './shop-product';
const subscriptionResolvers = GMR.merge([
    resolversShopProductsSubscription
]);

export default subscriptionResolvers;