import StripeApi, {
  STRIPE_OBJECTS,
  STRIPE_ACTIONS,
} from '../../lib/stripe-api';

interface IStripeCard {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}
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
      .then((result: { id: string, card: { fingerprint: string} }) => {
        return {
          status: true,
          message: `Token ${result.id} creado correctamente`,
          token: result.id,
          fingerprint: result.card.fingerprint
        };
      })
      .catch((error: Error) => this.getError(error));
  }
}

export default StripeCardService;
