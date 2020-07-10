import { IResolvers } from 'graphql-tools';
import { SUBSCRIPTIONS_EVENT } from '../../config/constants';
import { withFilter } from 'apollo-server-express';

const resolversShopProductSubscription: IResolvers = {
    Subscription: {
        updateStockProduct: {
            subscribe: (_, __, { pubsub}) => pubsub.asyncIterator(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT),
        },
        selectProductStockUpdate: {
            subscribe: withFilter((_, __, { pubsub }) => pubsub.asyncIterator(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT), (payload, variables) => {
                console.log(payload, variables);
                return +payload.selectProductStockUpdate.id === +variables.id;
            }),
        }
    }
};

export default resolversShopProductSubscription;