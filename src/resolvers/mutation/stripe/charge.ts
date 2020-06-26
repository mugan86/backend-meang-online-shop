
import { IResolvers } from 'graphql-tools';

const resolversStripeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment }) {
        console.log(payment);
      // return new StripeCardService().createToken(card);
    }
  },
};

export default resolversStripeChargeMutation;