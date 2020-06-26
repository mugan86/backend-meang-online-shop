import StripeApi, {
  STRIPE_OBJECTS,
  STRIPE_ACTIONS,
} from '../../lib/stripe-api';
import { IStripeCard } from '../../interfaces/stripe/card.interface';

class StripeCardService extends StripeApi {
  async createToken(card: IStripeCard) {
    return await new StripeApi()
      .execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTIONS.CREATE, {
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
      .catch((error: Error) => this.getError(error));
  }

  async createCard(customer: string, tokenCard: string, fingerprint: string) {
    // Validar para ver si ese cliente no ha añadido esa tarjeta, teniendo en cuenta la referencia de la huella dactilar
    // Validar que no existe la tarjeta con el fingerprint para no duplicarlas
    const listCards: Array<IStripeCard> = await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.LIST_SOURCE,
      customer,
      { object: 'card' }
    ).then((result: { data: Array<IStripeCard> }) => result.data);
    if (listCards.find((item) => item.fingerprint === fingerprint)) {
      return {
        status: false,
        message: `Tarjeta que estás creando ya existe en tu cuenta`,
      };
    }
    // No está registrada
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.CREATE_SOURCE,
      customer,
      { source: tokenCard }
    )
      .then((result: { id: string }) => {
        return {
          status: true,
          message: `La tarjeta se ha creado correctamente y se ha añadido al cliente`,
          card: result.id,
        };
      })
      .catch((error: Error) => this.getError(error));
  }
}

export default StripeCardService;
