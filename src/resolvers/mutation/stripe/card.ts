import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';

const resolversStripeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
      return new StripeCardService().createToken(card);
    },
    async createCard(_, { customer, tokenCard, fingerprint}) {
      return new StripeCardService().create(customer, tokenCard, fingerprint);
    }
  },
};

export default resolversStripeCardMutation;
