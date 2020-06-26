import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';

const resolversStripeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
        console.log(card);
      // return new StripeCustomerService().add(name, email, db);
    }
  },
};

export default resolversStripeCardMutation;