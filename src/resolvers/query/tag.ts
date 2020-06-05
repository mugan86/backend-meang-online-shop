import { IResolvers } from 'graphql-tools';
import TagsService from '../../services/tags.service';

const resolversTagQuery: IResolvers = {
    Query: {
        async tags(_, {page, itemsPage, active}, { db }) {
            return new TagsService(_, {
                pagination: { pagination: {page, itemsPage}}
            }, { db }).items(active);
        },
        async tag(_, { id }, { db }) {
            return new TagsService(_, { id }, { db }).details();
        }
    }
};

export default resolversTagQuery;