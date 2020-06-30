
import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';
const resolversStripeCardQuery: IResolvers = {
  Query: {
    async getCard(_, { id }) {
      return new StripeCardService().get(id);
    },
    async getCardByToken(_, { token }) {
      console.log(token);
      return new StripeCardService().getByToken(token);
    },

    async cards() {
      return new StripeCardService().list('cus_HXQDHD6XHyqPYF');
    }
  },
};

export default resolversStripeCardQuery;
