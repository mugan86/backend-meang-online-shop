import { IVariables } from './../interfaces/variables-interface';
import { IContextData } from './../interfaces/context-data.interface';
import {findElements, findOneElement, insertOneElement} from './../lib/db-operations';
import { Db } from 'mongodb';

class ResolversOperationsService {
    private root: object;
    private variables: IVariables;
    private context: IContextData;
    constructor(root: object, variables: IVariables, context: IContextData) {
        this.root = root;
        this.variables = variables;
        this.context = context;
    }
    protected getDb(): Db { return this.context.db;}
    protected getVariables(): IVariables { return this.variables; }
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
    protected async get(collection: string) {
        const collectionLabel = collection.toLowerCase();
        try {
            return await findOneElement(this.context.db, collection, { id: this.variables.id }).then(
                result => {
                    if (result) {
                        return {
                            status: true,
                            message: `${collectionLabel} ha sido cargada correctamente con sus detalles`,
                            item: result
                        };
                    }
                    return {
                        status: true,
                        message: `${collectionLabel} no ha obtenido detalles porque no existe`,
                        item: null
                    };
                }
            );
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al querer cargar los detalles de ${collectionLabel}`,
                item: null
            };
        }
    }
    // Añadir item
    protected async add(collection: string, document: object, label: string) {
        try {
            return await insertOneElement(this.context.db, collection, document).then(
                (result ) => {
                    if (result) {
                        return {
                            status: true,
                            message: `Item con la información ${label} ha sido añadido correctamente`,
                            item: document
                        };
                    }
                    return {
                        status: false,
                        message: `Item con la información ${label} NO ha sido añadida. Prueba de nuevo por favor`,
                        item: document
                    };

                }
            );
        } catch (error) {
            return {
                status: false,
                message: `Item con la información ${label} NO ha sido añadida por un error inesperado. Prueba de nuevo por favor`,
                item: document
            };
        }
    }
    // Modificar item

    // eliminar item
}

export default ResolversOperationsService;