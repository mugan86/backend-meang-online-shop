import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeApi, { STRIPE_OBJECTS } from '../../../lib/stripe-api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';

const resolversStripeCustomerMutation: IResolvers = {
  Mutation: {
    async createCustomer(_, { name, email }) {
      // COmprobar que el cliente no existe y en el caso de que exista,
      // devolver diciendo que no se puede añadir
      const userCheckExist: {
        data: Array<IStripeCustomer>;
      } = await new StripeApi().execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.LIST,
        { email }
      );
      if (userCheckExist.data.length > 0) {
        // Usuario existe
        return {
          status: false,
          message: `El usuario con el email ${email} ya existe en el sistema`,
        };
      }
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
