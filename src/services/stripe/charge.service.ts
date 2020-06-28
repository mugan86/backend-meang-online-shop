import { IPayment } from './../../interfaces/stripe/payment.interface';
import StripeApi from '../../lib/stripe-api';

class StripeChargeService extends StripeApi {
    async order(pay: IPayment) {
        pay.amount = +((Math.round(+pay.amount * 100) / 100).toFixed(2));
        pay.amount *= 100;
        console.log(pay);
    }
}

export default StripeChargeService;