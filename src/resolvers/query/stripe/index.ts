const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversStripeCustomerQuery from './customer';
import resolversStripeCardQuery from './card';
import resolversStripeChargeQuery from './charge';
const queryStripeResolvers = GMR.merge([
    resolversStripeCustomerQuery,
    resolversStripeCardQuery,
    resolversStripeChargeQuery
]);
export default queryStripeResolvers;