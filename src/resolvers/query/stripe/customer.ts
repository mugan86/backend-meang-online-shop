import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';
const resolversStripeCustomerQuery: IResolvers = {
  Query: {
    async customers(_, { limit, startingAfter, endingBefore }) {
      return new StripeCustomerService().list(
        limit,
        startingAfter,
        endingBefore
      );
    },
    async customer(_, { id }) {
      return new StripeCustomerService().get(id);
    },
  },
};

export default resolversStripeCustomerQuery;
