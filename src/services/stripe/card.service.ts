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
        };
      })
      .catch((error: Error) => this.getError(error));
  }

  async create(customer: string, tokenCard: string) {
    // Si no existe la tarjeta, la añadimos
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.CREATE_SOURCE,
      customer,
      { source: tokenCard }
    )
      .then((result: { id: string, card: { fingerprint: string} }) => {
        return {
          status: true,
          message: `Tarjeta ${result.id} añadida correctamente al cliente ${customer}`,
          card: result.id
        };
      })
      .catch((error: Error) => this.getError(error));
  }
  async list(customer: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.LIST_SOURCES,
      customer,
      { object: 'card', limit: 100 }
    ).then((result: { data: Array<IStripeCard> }) => {
      return {
        status: true,
        message: 'List',
        cards: result.data,
      };
    });
  }

  async get(id: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.GET_SOURCE,
      id
    )
      .then(async (result: IStripeCard) => {
        return {
          status: true,
          message: `La tarjeta ${result.number} se ha obtenido correctamente`,
          card: result.id
        };
      })
      .catch((error: Error) => this.getError(error));
  }

  async getByToken(token: string) {
    return await this.execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTIONS.GET, token)
      .then(async (result: { card: IStripeCard }) => {
        console.log(result);
        return {
          status: true,
          message: `La tarjeta se ha obtenido correctamente`,
          card: result.card.id
        };
      })
      .catch((error: Error) => this.getError(error));
  }

  async deleteDuplicates(customer: string, noDeleteCard: string) {
    // Obtener todo de ese cliente
    const listCards = await this.list(customer)
    .then( (result: { cards: Array<IStripeCard>}) => result.cards);
    console.log(listCards);
    listCards.map( async (item: IStripeCard) => {
      console.log(item.id, noDeleteCard);
      if (item.id !== noDeleteCard && noDeleteCard != '') {
        // Borrar
        await this.delete(item.id || '', customer);
      }
    } );
  }
  async delete(card: string, customer: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.DELETE_SOURCE,
      customer,
      card
    ).then((result: { deleted: boolean }) => {
      return {
        status: result.deleted,
        message: result.deleted
          ? 'Tarjeta seleccionada borrada'
          : 'No se ha borrado la tarjeta seleccionada',
      };
    });
  }
}

export default StripeCardService;
