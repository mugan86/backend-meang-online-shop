import { COLLECTIONS } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';


class ProductService extends ResolversOperationsService {
    collection = COLLECTIONS.PRODUCTS;
    constructor(root: object, variables: object, context: object) {
        super(root, variables, context);
    }

    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, shopProduct: result.item };
    }
}

export default ProductService;