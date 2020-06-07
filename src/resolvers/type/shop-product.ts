import { IResolvers } from 'graphql-tools';
import ProductService from '../../services/product.service';

const resolversShopProductType: IResolvers = {
  ShopProduct: {
    productId: (parent) => parent.product_id,
    platformId: (parent) => parent.platform_id,
    product: async (parent, __, { db }) => {
      const result = await new ProductService(
        {},
        { id: parent.product_id },
        { db }
      ).details();
      return result.shopProduct;
    },
  },
};

export default resolversShopProductType;
