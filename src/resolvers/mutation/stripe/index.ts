const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversStripeCustomerMutation from './customer';
import resolversStripeCardMutation from './card';
import resolversStripeChargeMutation from './charge';

const mutationStripeResolvers = GMR.merge([
    resolversStripeCustomerMutation,
    resolversStripeCardMutation,
    resolversStripeChargeMutation
]);

export default mutationStripeResolvers;