import { IResolvers } from 'graphql-tools';
import { withFilter } from 'apollo-server-express';
import { SUBSCRIPTIONS } from '../../config/constants';

const resolverShopProductSubscription: IResolvers = {
  Subscription: {
    newValue: {
      subscribe: (_, __, {pubsub}) => {
        return pubsub.asyncIterator('NEW_VALUE');
      },
    },
    updateStockProduct: {
      subscribe: (_, __, {pubsub}) => {
        return pubsub.asyncIterator('STOCK');
      },
    },
    updateStockSelectProduct: {
      subscribe: withFilter((_, __, {pubsub}) => pubsub.asyncIterator(SUBSCRIPTIONS.PRODUCT_STOCK_UPDATE), (payload, variables) => {
        console.log(payload);
        console.log(variables);
        return +payload.updateStockSelectProduct.id === +variables.id;
      }),
    },
  },
};

export default resolverShopProductSubscription;