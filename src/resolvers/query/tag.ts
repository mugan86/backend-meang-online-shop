import { IResolvers } from 'graphql-tools';
import TagsService from '../../services/tags.service';

const resolversTagQuery: IResolvers = {
    Query: {
        async tags(_, variables, { db }) {
            return new TagsService(_, {
                pagination: variables
            }, { db }).items();
        },
        async tag(_, { id }, { db }) {
            return new TagsService(_, { id }, { db }).details();
        }
    }
};

export default resolversTagQuery;