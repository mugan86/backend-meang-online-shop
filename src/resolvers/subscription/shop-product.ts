import { IResolvers } from 'graphql-tools';

const subscriptions: IResolvers = {
  Subscription: {
    newValue: {
      subscribe: (_, __, {pubsub}) => {
        return pubsub.asyncIterator([
          'NEW_VALUE',
        ]);
      },
    },
    updateStockProduct: {
      subscribe: (_, __, {pubsub}) => {
        return pubsub.asyncIterator([
          'STOCK',
        ]);
      },
    }
  },
};

export default subscriptions;