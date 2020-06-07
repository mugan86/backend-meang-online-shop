import { IResolvers } from 'graphql-tools';
import ShopProductsService from '../../services/shop-product.service';
const resolversShopProductsQuery: IResolvers = {
  Query: {
    shopProducts(_, {page, itemsPage, active}, context) {
      return new ShopProductsService(_, {
        pagination: { page, itemsPage}
    }, context).items(active);
    }
  },
};

export default resolversShopProductsQuery;