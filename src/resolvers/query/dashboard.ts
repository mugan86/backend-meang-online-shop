import { countElements } from './../../lib/db-operations';
import { IResolvers } from 'graphql-tools';

const resolversDashboardQuery: IResolvers = {
    Query: {
        async totalElements(_, { collection }, { db }) {
            return await countElements(db, collection);
        }
    }
};

export default resolversDashboardQuery;