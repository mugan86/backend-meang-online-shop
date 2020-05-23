import { COLLECTIONS } from './../config/constants';
import { findOneElement, asignDocumentId } from './../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import slugify from 'slugify';
class TagsService extends ResolversOperationsService {
    collection = COLLECTIONS.TAGS;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        console.log(this.getVariables().pagination);
        console.log(page, itemsPage);
        const result = await this.list(this.collection, 'tags', page, itemsPage);
        return { info: result.info, status: result.status, message: result.message, tags: result.items };
    }
    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, tag: result.item };
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
            id: await asignDocumentId(this.getDb(), this.collection, { id: -1}),
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

    async block() {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del género no se ha especificado correctamente',
                genre: null
            };
        }
        const result = await this.update(this.collection, { id }, { active: false }, 'género');
        return {
            status: result.status,
            message: (result.status) ? 'Bloqueado correctamente': 'No se ha bloqueado comprobarlo por favor'
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

export default TagsService;