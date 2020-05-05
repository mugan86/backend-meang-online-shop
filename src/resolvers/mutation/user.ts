import { IResolvers } from 'graphql-tools';
import UsersService from '../../services/users.service';
const resolversUserMutation: IResolvers = {
  Mutation: {
    async register(_, { user }, context) {
      return new UsersService(_, { user }, context).register();
    }
  },
};

export default resolversUserMutation;