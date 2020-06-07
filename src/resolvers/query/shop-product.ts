import { IResolvers } from 'graphql-tools';
import ShopProductsService from '../../services/shop-product.service';
const resolversShopProductsQuery: IResolvers = {
  Query: {
    shopProducts(_, { page, itemsPage, active }, context) {
      return new ShopProductsService(
        _,
        {
          pagination: { page, itemsPage },
        },
        context
      ).items(active);
    },
    shopProductsPlatforms(_, { page, itemsPage, active, platform }, context) {
      return new ShopProductsService(
        _,
        {
          pagination: { page, itemsPage },
        },
        context
      ).items(active, platform);
    },
  },
};

export default resolversShopProductsQuery;
