import { IPayment } from './../../interfaces/stripe/payment.interface';
import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';
import StripeCustomerService from './customer.service';
import StripeCardService from './card.service';

class StripeChargeService extends StripeApi {
    private async getClient(customer: string) {
        return new StripeCustomerService().get(customer);
    }
    async order(payment: IPayment) {
        // Comprobar que existe el cliente
        const userData = await this.getClient(payment.customer);
        if (userData && userData.status) {
            console.log('Cliente encontrado');
            if (payment.token !== undefined) {
                // Asociar el cliente a la tarjeta
                const cardCreate = await new StripeCardService().create(
                    payment.customer, payment.token
                );
                // Actualizar como fuente predeterminada de pago
                    await new StripeCustomerService().update(
                        payment.customer, {
                            default_source: cardCreate.card?.id
                        }
                    );
                // Actualizar borrando las demás tarjetas de ese cliente
                await new StripeCardService().removeOtherCards(
                    payment.customer, cardCreate.card?.id || ''
                );
            } else if (payment.token === undefined &&
                userData.customer?.default_source === null) {
                    return {
                        status: false,
                        message: 'El cliente no tiene ningún método de pago asignado y no se puede realizar pago'
                    };
                }
        } else {
            return {
                status: false,
                message: 'El cliente no encontrado y no se puede realizar pago'
            };
        }
        delete payment.token;
        // Convertir a 0 decimal
        payment.amount = +Math.round((+payment.amount + Number.EPSILON) * 100)/ 100;
        payment.amount *= 100;
        if (payment.amount === parseInt(payment.amount.toString(), 10)) {
            console.log('Integer! OK!');
        } else {
            console.log('Not integer!!');
            payment.amount = Math.ceil(payment.amount);
        }
        // Pago
        return await this.execute(
            STRIPE_OBJECTS.CHARGES,
            STRIPE_ACTIONS.CREATE,
            payment
        ).then((result: object) => {
            return {
                status: true,
                message: 'Pago realizado correctamente!',
                charge: result
            };
        }).catch((error: Error) => this.getError(error));
    }
}

export default StripeChargeService;