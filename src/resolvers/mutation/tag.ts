import { IResolvers } from 'graphql-tools';
import TagsService from '../../services/tags.service';

const resolversTagMutation: IResolvers = {
  Mutation: {
    addTag(_, variables, context) {
      return new TagsService(_, variables, context).insert();
    },
    updateTag(_, variables, context) {
      return new TagsService(_, variables, context).modify();
    },
    deleteTag(_, variables, context) {
      return new TagsService(_, variables, context).delete();
    },
    blockTag(_, {id, unblock}, context) {
      return new TagsService(_, {id}, context).unblock(unblock);
    },
  },
};

export default resolversTagMutation;