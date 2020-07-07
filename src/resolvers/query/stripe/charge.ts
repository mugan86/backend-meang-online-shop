// async clientCharges(_, {customer, limit, })
import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';
const resolversStripeChargeQuery: IResolvers = {
  Query: {
    async chargesByCustomer(_, { customer, limit, startingAfter, endingBefore }) {
      return new StripeChargeService().listByCustomer(
        customer,
        limit,
        startingAfter,
        endingBefore
      );
    }
  },
};

export default resolversStripeChargeQuery;