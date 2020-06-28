import { IPayment } from './../../interfaces/stripe/payment.interface';
import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';

class StripeChargeService extends StripeApi {
    async order(pay: IPayment) {
        pay.amount = +((Math.round(+pay.amount * 100) / 100).toFixed(2));
        pay.amount *= 100;
        console.log(pay);
        return await this.execute(
            STRIPE_OBJECTS.CHARGES,
            STRIPE_ACTIONS.CREATE,
            pay
        ).then((result: object) => {
            return {
                status: true,
                message: 'Pago procesardo correctamente',
                charge: result
            };
        }).catch((error: Error) => this.getError(error));
    }
}

export default StripeChargeService;