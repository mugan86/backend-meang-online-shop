import { STRIPE_OBJECTS, STRIPE_ACTIONS } from './../../../lib/stripe-api';
import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe-api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
const resolversStripeCustomerQuery: IResolvers = {
  Query: {
    async customers(_, { limit, startingAfter, endingBefore }) {
      let pagination;
      if (startingAfter !== '' && endingBefore === '') {
        pagination = { starting_after: startingAfter };
      } else if (startingAfter === '' && endingBefore !== '') {
        pagination = { ending_before: endingBefore };
      } else {
        pagination = {};
      }
      return await new StripeApi()
        .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.LIST, {
          limit,
          ...pagination,
        })
        .then((result: { has_more: boolean; data: Array<IStripeCustomer> }) => {
          return {
            status: true,
            message:
              'Lista cargada correctamente con los clientes seleccionados',
            hasMore: result.has_more,
            customers: result.data,
          };
        })
        .catch((error: Error) => {
          return {
            status: false,
            message: 'Error: '.concat(error.message),
            hasMore: false,
          };
        });
    },
    async customer(_, { id }) {
      return await new StripeApi()
        .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.GET, id)
        .then(async (result: IStripeCustomer) => {
          return {
            status: true,
            message: `El cliente ${result.name} se ha obtenido correctamente`,
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

export default resolversStripeCustomerQuery;
