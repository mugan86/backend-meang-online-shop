import { COLLECTIONS, ACTIVE_VALUES_FILTER } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class ShopProductsService extends ResolversOperationsService {
  collection = COLLECTIONS.SHOP_PRODUCT;
  constructor(root: object, variables: object, context: object) {
    super(root, variables, context);
  }

  async items(
    active: string = ACTIVE_VALUES_FILTER.ACTIVE,
    platform: string = ''
  ) {
    let filter: object = { active: { $ne: false } };
    if (active === ACTIVE_VALUES_FILTER.ALL) {
      filter = {};
    } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
      filter = { active: false };
    }
    if (platform !== '' && platform !== undefined) {
      filter = {...filter, ...{platform_id: platform}};
    }
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;
    const result = await this.list(
      this.collection,
      'productos de la tienda',
      page,
      itemsPage,
      filter
    );
    return {
      info: result.info,
      status: result.status,
      message: result.message,
      shopProducts: result.items,
    };
  }
}

export default ShopProductsService;
