import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';
import { IStripeCustomer } from '../../interfaces/stripe/customer.interface';

class StripeCustomerService extends StripeApi {
  // Clientes lista
  async list(limit: number, startingAfter: string, endingBefore: string) {
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
      .catch((error: Error) => this.getError(error));
  }
  async get(id: string) {
    return await new StripeApi()
    .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.GET, id)
    .then(async (result: IStripeCustomer) => {
      return {
        status: true,
        message: `El cliente ${result.name} se ha obtenido correctamente`,
        customer: result,
      };
    })
    .catch((error: Error) => this.getError(error));
  }
}

export default StripeCustomerService;
