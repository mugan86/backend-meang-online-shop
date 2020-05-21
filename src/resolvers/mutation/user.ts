import { IResolvers } from 'graphql-tools';
import UsersService from '../../services/users.service';
const resolversUserMutation: IResolvers = {
  Mutation: {
    register(_, { user }, context) {
      return new UsersService(_, { user }, context).register();
    },
    updateUser(_, { user }, context) {
      return new UsersService(_, { user }, context).modify();
    },
    deleteUser(_, { id }, context) {
      return new UsersService(_, { id }, context).delete();
    },
    blockUser(_, { id }, context) {
      return new UsersService(_, { id }, context).block();
    },
  },
};

export default resolversUserMutation;