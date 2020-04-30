import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.inteface';

class GenresService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
}

export default GenresService;