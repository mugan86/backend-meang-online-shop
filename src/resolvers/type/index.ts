import GMR from 'graphql-merge-resolvers';
import resolversShopProductType from './shop-product';
import resolversPlatformType from './platform';


const typeResolvers = GMR.merge([
    resolversShopProductType,
    resolversPlatformType
]);

export default typeResolvers;