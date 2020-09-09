const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversStripeChargeType from './charge';
const typeStripeResolvers = GMR.merge([
    resolversStripeChargeType
]);
export default typeStripeResolvers;