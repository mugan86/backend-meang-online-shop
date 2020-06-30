import { IStripeCard } from './../../interfaces/stripe/card.interface';
import StripeApi, {
  STRIPE_OBJECTS,
  STRIPE_ACTIONS,
} from '../../lib/stripe-api';

class StripeCardService extends StripeApi {
  async createToken(card: IStripeCard) {
    return await this
      .execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTIONS.CREATE, {
        card: {
          number: card.number,
          exp_month: card.expMonth,
          exp_year: card.expYear,
          cvc: card.cvc
        },
      })
      .then((result: { id: string }) => {
        return {
          status: true,
          message: `Token ${result.id} creado correctamente`,
          token: result.id,
        };
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  async create(customer: string, tokenCard: string) {
      return this.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.CREATE_SOURCE,
        customer,
        { source: tokenCard }
      ).then((result: IStripeCard) => {
        return {
          status: true,
          message: `Tarjeta ${result.id} creada correctamente`,
          id: result.id,
          card: result
        };
      })
      .catch((error: Error) =>  this.getError(error));
  }
  async get (customer: string, card: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.GET_SOURCE,
      customer,
      card
    ).then((result: IStripeCard) => {
      return {
        status: true,
        message: `Detalle de la tarjeta ${result.id} mostrado correctamente`,
        id: result.id,
        card: result
      };
    })
    .catch((error: Error) =>  this.getError(error));
  }

  async update (customer: string, card: string, details: object) {
      return await this.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.UPDATE_SOURCE,
        customer,
        card,
        details
      ).then((result: IStripeCard) => {
        return {
          status: true,
          message: `Actualizado ${result.id} correctamente`,
          id: result.id,
          card: result
        };
      })
      .catch((error: Error) =>  this.getError(error));
  }
}

export default StripeCardService;
