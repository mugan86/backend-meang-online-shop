import { IContextData } from './../interfaces/context-data.interface';
import {findElements} from './../lib/db-operations';

class ResolversOperationsService {
    private root: object;
    private variables: object;
    private context: IContextData;
    constructor(root: object, variables: object, context: IContextData) {
        this.root = root;
        this.variables = variables;
        this.context = context;
    }
    // Listar información
    protected async list(collection: string, listElement: string) {
        try {
            return {
                status: true,
                message: `Lista de ${ listElement } correctamente cargada`,
                items: await findElements(this.context.db, collection)
            };
        } catch (error) {
            return {
                status: false,
                message: `Lista de ${ listElement } no cargada: ${ error }`,
                items: null
            };
        }
    }
    // Obtener detalles del item

    // Añadir item

    // Modificar item

    // eliminar item
}

export default ResolversOperationsService;