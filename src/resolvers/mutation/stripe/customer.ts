import { STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeApi, { STRIPE_OBJECTS } from '../../../lib/stripe-api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import { findOneElement } from '../../../lib/db-operations';
import { COLLECTIONS } from '../../../config/constants';
import { IUser } from '../../../interfaces/user.interface';
import UsersService from '../../../services/users.service';

const resolversStripeCustomerMutation: IResolvers = {
  Mutation: {
    async createCustomer(_, { name, email }, { db }) {
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
        .then(async (result: IStripeCustomer) => {
            // Actualizar en nuestra base de datos con la nueva 
            // propiedad que es el id del cliente
            const user: IUser = await findOneElement(db, COLLECTIONS.USERS, { email });
            if (user) {
                user.stripeCustomer = result.id;
                const resultUserOperation = await new UsersService(_, { user }, {db}).modify();
                console.log(resultUserOperation);
                // Si el resultado es falso, no se ha ejecutado. Tenemos que borrar el cliente creado  (en Stripe)
            }
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
    async updateCustomer(_, { id, customer}) {
      console.log(id, customer);
      return await new StripeApi().execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.UPDATE,
        id,
        customer
      ).then((result: IStripeCustomer) => {
        return {
          status: true,
          message: `Usuario ${id} actualizado correctamente`,
          customer: result
        };
      }).catch((error: Error) => {
        return {
          status: false,
          message: 'Error: '.concat(error.message)
        };
      });
    }
  },
};

export default resolversStripeCustomerMutation;
