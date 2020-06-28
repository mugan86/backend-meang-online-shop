import { IPayment } from './../../interfaces/stripe/payment.interface';
import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';
import StripeCustomerService from './customer.service';

class StripeChargeService extends StripeApi {
    private async getClient(customer: string) {
        return new StripeCustomerService().get(customer);
    }
    async order(pay: IPayment) {
        // Cliente buscar info detallada
        const customerData = await this.getClient(pay.customer);
        if (customerData.status) {
            console.log('Cliente asignado correcamente');
        } else {
            console.log('No hay cliente');
            return {
                status: false,
                message: 'El cliente seleccionado no existe y no podremos realizar pagos con esta información'
            };
        }
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