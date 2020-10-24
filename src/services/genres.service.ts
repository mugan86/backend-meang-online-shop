import { COLLECTIONS, ACTIVE_VALUES_FILTER } from './../config/constants';
import { findOneElement, asignDocumentId } from './../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import slugify from 'slugify';
class GenresService extends ResolversOperationsService {
    collection = COLLECTIONS.GENRES;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
    async items(active: string = ACTIVE_VALUES_FILTER.ACTIVE) {
        let filter: object = { active: {$ne: false}};
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = {};
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: false };
        }
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        const result = await this.list(this.collection, 'géneros', page, itemsPage, filter);
        return { info: result.info, status: result.status, message: result.message, genres: result.items };
    }
    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, genre: result.item };
    }

    async insert() {
        const genre = this.getVariables().genre;
        // Comprobar que no está en blanco ni es indefinido
        if (!this.checkData(genre || '')) {
            return {
                status: false,
                message: 'El género no se ha especificado correctamente',
                genre: null
            };
        }
        // COmprobar que no existe
        if (await this.checkInDatabase(genre || '')) {
            return {
                status: false,
                message: 'El género existe en la base de datos, intenta con otro género',
                genre: null
            };
        }
        // Si valida las opciones anteriores, venir aquí y crear el documento
        const genreObject = {
            id: await asignDocumentId(this.getDb(), this.collection, { _id: -1}),
            name: genre,
            slug: slugify(genre || '', { lower: true })
        };
        const result = await this.add(this.collection, genreObject, 'género');
        return { status: result.status, message: result.message, genre: result.item };
    }
    async modify() {
        const id = this.getVariables().id;
        const genre = this.getVariables().genre;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del género no se ha especificado correctamente',
                genre: null
            };
        }
        if (!this.checkData(genre || '')) {
            return {
                status: false,
                message: 'El género no se ha especificado correctamente',
                genre: null
            };
        }
        const objectUpdate = { 
            name: genre,
            slug: slugify(genre || '', {lower: true})
        };
        
        const result = await this.update(this.collection, { id }, objectUpdate, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }

    async delete() {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del género no se ha especificado correctamente',
                genre: null
            };
        }
        const result = await this.del(this.collection, { id }, 'genero');
        return { status: result.status, message: result.message };
    }

    async unblock(unblock: boolean = false) {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del género no se ha especificado correctamente',
                genre: null
            };
        }
        const result = await this.update(this.collection, { id }, { active: unblock}, 'usuario');
        const action = (unblock) ? 'Desbloqueado' : 'Bloqueado';
        return {
            status: result.status,
            message: (result.status) ? `${action} correctamente`: `No se ha ${action.toLowerCase()} comprobarlo por favor`
        };
    }
    private checkData(value: string) {
        return (value === '' || value === undefined) ? false: true;
    }

    private async checkInDatabase(value: string) {
        return await findOneElement(this.getDb(), this.collection, {
            name: value
        });
    }
}

export default GenresService;