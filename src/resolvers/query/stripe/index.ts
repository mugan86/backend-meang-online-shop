import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomerQuery from './customer';
const queryStripeResolvers = GMR.merge([
    resolversStripeCustomerQuery
]);
export default queryStripeResolvers;