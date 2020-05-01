import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import { COLLECTIONS } from '../config/constants';

class GenresService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async items() {
        const result = await this.list(COLLECTIONS.GENRES, 'géneros');
        return { status: result.status, message: result.message, genres: result.items };
    }
}

export default GenresService;