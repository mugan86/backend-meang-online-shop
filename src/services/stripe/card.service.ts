import { IStripeCard } from './../../interfaces/stripe/card.interface';
import StripeApi, {
  STRIPE_OBJECTS,
  STRIPE_ACTIONS,
} from '../../lib/stripe-api';

class StripeCardService extends StripeApi {
  async createToken(card: IStripeCard) {
    return await this.execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTIONS.CREATE, {
      card: {
        number: card.number,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
      },
    })
      .then((result: { id: string; card: { fingerprint: string } }) => {
        return {
          status: true,
          message: `Token ${result.id} creado correctamente`,
          token: result.id,
          fingerprint: result.card.fingerprint,
        };
      })
      .catch((error: Error) =>  this.getError(error));
  }

  async create(customer: string, tokenCard: string, fingerprint: string) {
    // Validar que tarjeta no existe.
    // Si existe, mostrar mensaje de"error"

    const listCards: Array<IStripeCard> = await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.LIST_SOURCES,
      customer,
      { object: 'card', limit: 100 }
    ).then((result: { data: Array<IStripeCard> }) => result.data);

    if (listCards.find((item) => item.fingerprint === fingerprint)) {
      return {
        status: false,
        message: `Tarjeta que quieres añadir ya existe para este cliente`,
      };
    }

    // Si no existe la tarjeta, la añadimos
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.CREATE_SOURCE,
      customer,
      { source: tokenCard }
    )
      .then((result: { id: string }) => {
        return {
          status: true,
          message: `Tarjeta ${result.id} añadida correctamente al cliente ${customer}`,
          card: result.id,
        };
      })
      .catch((error: Error) => this.getError(error));
  }
}

export default StripeCardService;
