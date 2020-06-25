import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe-api';

const resolversStripeCustomerMutation: IResolvers = {
  Mutation: {
    async createCustomer(_, {name, email}) {
        const stripe = new StripeApi().stripe;
        return await stripe.customers.create(
            {
                name,
                email,
                description: `${name} (${email})`
            }
        ).then((result: object) => {
            return {
                status: true,
                message: `El cliente ${name} se ha creado correctamente`,
                customer: result
            };
        }).catch((error: Error) => {
            return {
                status: false,
                message: `Error: `.concat(error.message)
            };
        });
    }
  },
};

export default resolversStripeCustomerMutation;