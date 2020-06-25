import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeApi, { STRIPE_OBJECTS } from '../../../lib/stripe-api';

const resolversStripeCustomerMutation: IResolvers = {
  Mutation: {
    async createCustomer(_, { name, email }) {
      return await new StripeApi()
        .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.CREATE, {
          name,
          email,
          description: `${name} (${email})`,
        })
        .then((result: object) => {
          return {
            status: true,
            message: `El cliente ${name} se ha creado correctamente`,
            customer: result,
          };
        })
        .catch((error: Error) => {
          return {
            status: false,
            message: `Error: `.concat(error.message),
          };
        });
    },
  },
};

export default resolversStripeCustomerMutation;
