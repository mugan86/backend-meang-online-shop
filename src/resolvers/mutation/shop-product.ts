
import { IResolvers } from 'graphql-tools';
import ShopProductsService from '../../services/shop-product.service';

const resolversShopProductMutation: IResolvers = {
  Mutation: {
    updateStock(_,{update}, context) {
      return new ShopProductsService(_, {}, context).updateStock(update);
    }
  },
};

export default resolversShopProductMutation;