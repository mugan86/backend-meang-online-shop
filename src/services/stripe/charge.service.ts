import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';
import { IPayment } from '../../interfaces/stripe/payment.interface';
import { ICharge } from '../../interfaces/stripe/charge.interface';


class ChargeService extends StripeApi{
    async pay(payment: IPayment) {
        if (payment.currency === 'EUR' || payment.currency === 'USD') {
            payment.amount*=100;
        }
        return await this.execute(
            STRIPE_OBJECTS.CHARGES,
            STRIPE_ACTIONS.CREATE,
            payment
        ).then((result: ICharge) => {
            // Hacer copia de los datos destacados en nuestra base de datos
            return {
                status: true,
                message: `Procesado correctamente el pedido ${result.id}`,
                charge: {
                    id: result.id,
                    typeOrder: result.object,
                    customer: result.customer,
                    amount: result.amount / 100,
                    created: result.created,
                    currency: result.currency.toUpperCase(),
                    description: result.description,
                    paid: result.paid,
                    card: result.payment_method,
                    receiptEmail: result.receipt_email,
                    receiptUrl: result.receipt_url,
                    status: result.status
                }
            };
        }).catch((error: Error) => this.getError(error));
    }
}

export default ChargeService;