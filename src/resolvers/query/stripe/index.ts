import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomerQuery from './customer';
import resolversStripeCardQuery from './card';
const queryStripeResolvers = GMR.merge([
    resolversStripeCustomerQuery,
    resolversStripeCardQuery
]);
export default queryStripeResolvers;