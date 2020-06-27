import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';

const resolversStripeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
      return new StripeCardService().createToken(card);
    },
  },
};

export default resolversStripeCardMutation;
