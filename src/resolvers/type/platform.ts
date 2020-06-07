import { IResolvers } from 'graphql-tools';

const resolversPlatformType: IResolvers = {
  Platform: {
      active: (parent) => (parent.active !== false ) ? true : false
  }
};

export default resolversPlatformType;