import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';


const resolversStripeChargeQuery: IResolvers = {
    Query: {
        chargesByCustomer(_, { customer, limit, startingAfter, endingBefore }) {
            return new StripeChargeService().listByCustomer(
            customer,
              limit,
              startingAfter,
              endingBefore
            );
          },
    }
};

export default resolversStripeChargeQuery;