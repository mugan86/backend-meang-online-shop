import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomerMutation from './customer';

const mutationStripeResolvers = GMR.merge([
    resolversStripeCustomerMutation
]);

export default mutationStripeResolvers;