import { IResolvers } from 'graphql-tools';
import { SUBSCRIPTIONS_EVENT } from '../../config/constants';

const resolversShopProductSubscription: IResolvers = {
    Subscription: {
        updateStockProduct: {
            subscribe: (_, __, { pubsub}) => pubsub.asyncIterator(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT),
        }
    }
};

export default resolversShopProductSubscription;