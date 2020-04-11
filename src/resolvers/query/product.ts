import { IResolvers } from 'graphql-tools';
const resolversProductsQuery: IResolvers = {
  Query: {
    products() {
      return false;
    }
  },
};

export default resolversProductsQuery;