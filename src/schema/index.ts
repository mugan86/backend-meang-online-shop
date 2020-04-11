import 'graphql-import-node';
// import typeDefs from './schema.graphql';
import resolvers from './../resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

// COnfiguración mezcla de schemas
import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(`${__dirname}/**/*.graphql`));

const typeDefs = mergeTypes(typesArray, { all: true });

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

export default schema;
