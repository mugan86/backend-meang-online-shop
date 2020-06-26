import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';
import StripeApi, { STRIPE_OBJECTS } from '../../../lib/stripe-api';

const resolversStripeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
      console.log(card);
      return await new StripeApi().execute(
        STRIPE_OBJECTS.TOKENS,
        STRIPE_ACTIONS.CREATE,
        {
          card: {
            number: card.number,
            exp_month: card.expMonth,
            exp_year: card.expYear,
            cvc: card.cvc,
          },
        }
      ).then( (result: {id: string }) => {
        return {
            status: true,
            message: `Token ${ result.id } creado correctamente`,
            token: result.id
        };
      }).catch((error: Error) => {
          console.log(error.message);
      });
    
    },
  },
};

export default resolversStripeCardMutation;
