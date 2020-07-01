import { IPayment } from './../../interfaces/stripe/payment.interface';
import StripeApi from '../../lib/stripe-api';

class StripeChargeService extends StripeApi {
    async order(payment: IPayment) {
        console.log(payment);
        payment.amount = Math.round((+payment.amount + Number.EPSILON) * 100)/ 100;
        console.log(payment.amount);
        payment.amount *= 100;
        console.log(payment);
    }
}

export default StripeChargeService;