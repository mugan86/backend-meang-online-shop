import { IResolvers } from 'graphql-tools';

const resolversProductType: IResolvers = {
  Product : {
    screenshoot: (parent) => parent.shortScreenshots
  }
};

export default resolversProductType;