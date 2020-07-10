import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';

const resolversStripeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment, stockChange }, { db, pubsub}) {
        return new StripeChargeService().order(payment, stockChange, pubsub, db);
    }
  },
};

export default resolversStripeChargeMutation;