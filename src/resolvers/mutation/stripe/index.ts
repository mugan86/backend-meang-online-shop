import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomerMutation from './customer';
import resolversStripeCardMutation from './card';

const mutationStripeResolvers = GMR.merge([
    resolversStripeCustomerMutation,
    resolversStripeCardMutation
]);

export default mutationStripeResolvers;