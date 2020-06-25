import { IResolvers } from 'graphql-tools';

const resolversStripeCustomerMutation: IResolvers = {
  Mutation: {
    createCustomer(_, variables, context) {
      return;
    }
  },
};

export default resolversStripeCustomerMutation;