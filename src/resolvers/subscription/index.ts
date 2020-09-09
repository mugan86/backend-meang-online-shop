const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversShopProductSubscription from './shop-product';

const subscriptionResolvers = GMR.merge([
    resolversShopProductSubscription
]);

export default subscriptionResolvers;