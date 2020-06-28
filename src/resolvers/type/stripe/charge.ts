
import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';

const resolversStripeChargeType: IResolvers = {
  StripeCharge : {
    typeOrder: (parent) => parent.object,
    receiptEmail: async (parent) => {
        const userData = await new StripeCustomerService().get(
            parent.customer
        );
        return (userData.customer?.email) ? userData.customer?.email : '';
    },
    receiptUrl: (parent) => parent.receipt_url,
    amount: (parent) => parent.amount / 100 ,
    card: (parent) => parent.payment_method,
    created: (parent) => new Date(parent.created * 1000).toISOString()
  }
};

export default resolversStripeChargeType;