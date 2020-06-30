import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';
const resolversStripeCardQuery: IResolvers = {
  Query: {
    async card(_, { customer, card }) {
      return new StripeCardService().get(customer, card);
    },
  },
};

export default resolversStripeCardQuery;