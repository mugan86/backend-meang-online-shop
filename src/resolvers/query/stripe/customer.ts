import { IResolvers } from 'graphql-tools';
const resolversStripeCustomerQuery: IResolvers = {
  Query: {
    async customers(_, { limit } ) {
        console.log(limit);
    },
  },
};

export default resolversStripeCustomerQuery;