import { IResolvers } from 'graphql-tools';

const resolversStripeChargeType: IResolvers = {
  StripeCharge: {
      typeOrder: (parent) => parent.object,
      amount: (parent) => parent.amount / 100,
      currency: (parent) => parent.currency.toUpperCase(), 
      card: (parent) => parent.payment_method,
      receiptEmail: (parent) => parent.receipt_email,
      receiptUrl: (parent) => parent.receipt_url,
    }
};

export default resolversStripeChargeType;
                   