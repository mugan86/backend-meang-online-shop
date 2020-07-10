import { IResolvers } from 'graphql-tools';

const resolversShopProductSubscription: IResolvers = {
    Query: {
        async updateStockProduct(_, ___, { pubsub }) {
            console.log('Actualizando stock');
        }
    }
};

export default resolversShopProductSubscription;