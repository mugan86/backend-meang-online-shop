import GMR from 'graphql-merge-resolvers';
import resolversShopProductType from './shop-product';


const typeResolvers = GMR.merge([
    resolversShopProductType
]);

export default typeResolvers;