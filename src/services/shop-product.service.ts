import { randomItems, manageStockUpdate, findOneElement } from './../lib/db-operations';
import { COLLECTIONS, ACTIVE_VALUES_FILTER, SUBSCRIPTIONS_EVENT } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';
import { IStock } from '../interfaces/stock.interface';
import { PubSub } from 'apollo-server-express';

class ShopProductsService extends ResolversOperationsService {
  collection = COLLECTIONS.SHOP_PRODUCT;
  constructor(root: object, variables: object, context: object) {
    super(root, variables, context);
  }

  async items(
    active: string = ACTIVE_VALUES_FILTER.ACTIVE,
    platform: Array<string> = ['-1'],
    random = false,
    otherFilters: object = {}
  ) {
    console.log(active);
    let filter: object = { active: { $ne: false } };
    if (active === ACTIVE_VALUES_FILTER.ALL) {
      filter = { };
    } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
      filter = { active: false };
    }
    if (platform[0] !== '-1' && platform !== undefined) {
      filter = {...filter, ...{platform_id: {$in: platform}}};
    }
    console.log(filter);
    if (otherFilters !== {} && otherFilters !== undefined) {
      filter = {...filter, ...otherFilters};
    }
    console.log(filter);
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;
    if(!random) {
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
    console.log('Filter', filter);
    const result: Array<object> = await randomItems(
      this.getDb(),
      this.collection,
      filter,
      itemsPage
    ); 
    if (result.length === 0 || result.length !== itemsPage) {
      return {
        info: { page: 1, pages: 1, itemsPage, total: 0},
        status: false,
        message: 'La información que hemos pedido no se ha obtenido tal y como deseabamos',
        shopProducts: [],
      };
    }
    return {
      info: { page: 1, pages: 1, itemsPage, total: itemsPage},
      status: true,
      message: 'La información que hemos pedido se ha cargado correctamente',
      shopProducts: result,
    };
    
  }

  async details() {
    const result = await this.get(this.collection);
    return { status: result.status, message: result.message, shopProduct: result.item };
  }

  async updateStock(updateList: Array<IStock>, pubsub: PubSub) {
    try {
      updateList.map(async(item: IStock) => {
        console.log(item);
        const itemDetails = await findOneElement(
          this.getDb(), COLLECTIONS.SHOP_PRODUCT,
          { id: +item.id}
        );
        if(item.increment < 0 && ((item.increment + itemDetails!.stock) < 0)) {
          item.increment = -itemDetails!.stock;
        }
        await manageStockUpdate(
          this.getDb(),
          COLLECTIONS.SHOP_PRODUCT,
          {id: +item.id},
          {stock: item.increment}
        );
        itemDetails!.stock += item.increment; 
        pubsub.publish(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT, 
          { updateStockProduct: itemDetails});
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default ShopProductsService;
