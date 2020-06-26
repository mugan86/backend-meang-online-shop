import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';

const resolversStripeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
      return new StripeCardService().createToken(card);
    },
    async createCard(_, { customer, tokenCard }) {
      return new StripeCardService().createCard(customer, tokenCard);
    }
  },
};

export default resolversStripeCardMutation;
