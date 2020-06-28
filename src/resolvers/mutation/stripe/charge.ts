import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';

const resolversStripeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment }) {
        console.log(payment);
        return new StripeChargeService().order(payment);
    }
  },
};

export default resolversStripeChargeMutation;
