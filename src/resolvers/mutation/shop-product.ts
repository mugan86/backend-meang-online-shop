

import { IResolvers } from 'graphql-tools';

const resolversShopProductMutation: IResolvers = {
  Mutation: {
    updateStock(_, { update }, {db}) {
        console.log(update);
      // return new GenresService(_, variables, context).insert();
    }
  },
};

export default resolversShopProductMutation;
