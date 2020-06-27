import StripeApi, {
  STRIPE_OBJECTS,
  STRIPE_ACTIONS,
} from '../../lib/stripe-api';
import { IPayment } from '../../interfaces/stripe/payment.interface';
import StripeCustomerService from './customer.service';
import StripeCardService from './card.service';

class ChargeService extends StripeApi {
  async pay(payment: IPayment) {
    console.log(payment);
    // Comprobar si usuario tiene información almacenada para realizar el pago
    // Obtener datos del cliete
    const customerData = await new StripeCustomerService().get(
      payment.customer
    );
    if (customerData.status) {
      if (
        payment.token !== '' &&
        payment.fingerprint !== ''
      ) {
        console.log('Vamos a añadir nuevo método de pago');
        const cardCreate = await new StripeCardService().createCard(
          payment.customer,
          payment.token,
          payment.fingerprint
        );
        if (customerData.customer?.default_source !== null) {
            console.log('Reemplazo del método de pago como predeterminado');
            await new StripeCustomerService().update(payment.customer, {
              default_source: cardCreate.card,
            });
        } else {
            if (!cardCreate.status) {
                return {
                    status: false,
                    message:
                    'No tienes ningún método de pago asociado o, tienes que añadirlo',
                };
            }
        }
        
        
      } else if (
        customerData.customer?.default_source === null &&
        (payment.token === '' || payment.fingerprint === '')
      ) {
        return {
          status: false,
          message: `Hay que tener un método de pago para poder realizar el cargo del pedido`,
        };
      }
    }
    // Ya tenemos un método de pago asignado al cliente
    if (payment.currency === 'EUR' || payment.currency === 'USD') {
      payment.amount *= 100;
    }
    const cart = JSON.parse(payment.cart);
    delete payment.cart;
    delete payment.token;
    delete payment.fingerprint;
    console.log(cart);
    return await this.execute(
      STRIPE_OBJECTS.CHARGES,
      STRIPE_ACTIONS.CREATE,
      payment
    )
      .then(
        (result: {
          id: string;
          status: string;
          created: number;
          paid: true;
          customer: string;
          object: string;
        }) => {
          // Hacer copia de los datos destacados en nuestra base de datos
          const dbInfo = {
            qty: cart.total,
            typeOrder: result.object,
            paid: result.paid,
            status: result.status,
            created: result.created,
            user: payment.customer,
          };
          console.log(dbInfo);
          return {
            status: true,
            message: `Procesado correctamente el pedido ${result.id}`,
            charge: result,
          };
        }
      )
      .catch((error: Error) => this.getError(error));
  }
}

export default ChargeService;
