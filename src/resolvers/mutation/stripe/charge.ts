import { IResolvers } from 'graphql-tools';

const resolversStripeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment }) {
        console.log(payment);
      // return new StripeCustomerService().add(name, email, db);
    }
  },
};

export default resolversStripeChargeMutation;