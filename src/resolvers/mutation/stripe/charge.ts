
import { IResolvers } from 'graphql-tools';
import ChargeService from '../../../services/stripe/charge.service';

const resolversStripeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment }) {
        return new ChargeService().pay(payment);
    }
  },
};

export default resolversStripeChargeMutation;