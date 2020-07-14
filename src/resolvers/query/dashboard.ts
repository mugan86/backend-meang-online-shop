import { IResolvers } from 'graphql-tools';
import { countElements } from '../../lib/db-operations';

const resolversDashboardQuery: IResolvers = {
    Query: {
        async totalElements(_, { collection }, { db }) {
            return await countElements(db, collection);
        }
    }
};

export default resolversDashboardQuery;