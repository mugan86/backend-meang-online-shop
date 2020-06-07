import GMR from 'graphql-merge-resolvers';
import resolversUserQuery from './user';
import resolversShopProductsQuery from './shop-product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversShopProductsQuery,
    resolversGenreQuery,
    resolversTagQuery
]);

export default queryResolvers;