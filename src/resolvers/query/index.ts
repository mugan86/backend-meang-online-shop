import GMR from 'graphql-merge-resolvers';
import resolversUserQuery from './user';
import resolversProductsQuery from './product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery,
    resolversGenreQuery,
    resolversTagQuery
]);

export default queryResolvers;