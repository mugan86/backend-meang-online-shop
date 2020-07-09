import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';
const resolversStripeCustomerQuery: IResolvers = {
  Query: {
    async customers(_, { limit, startingAfter, endingBefore }, { pubsub }) {
      console.log(pubsub);
      
      return new StripeCustomerService().list(
        limit,
        startingAfter,
        endingBefore,
        pubsub
      );
    },
    async customer(_, { id }) {
      return new StripeCustomerService().get(id);
    },
  },
};

export default resolversStripeCustomerQuery;
