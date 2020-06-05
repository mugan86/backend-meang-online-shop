import { COLLECTIONS, ACTIVE_VALUES_FILTER } from './../config/constants';
import { findOneElement, asignDocumentId } from './../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import slugify from 'slugify';
class TagsService extends ResolversOperationsService {
    collection = COLLECTIONS.TAGS;
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
        const result = await this.list(this.collection, 'tags', page, itemsPage, filter);
        return { info: result.info, status: result.status, message: result.message, tags: result.items };
    }
    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, tag: result.item };
    }

    async insert() {
        const tag = this.getVariables().tag;
        // Comprobar que no está en blanco ni es indefinido
        if (!this.checkData(tag || '')) {
            return {
                status: false,
                message: 'El tag no se ha especificado correctamente',
                tag: null
            };
        }
        // COmprobar que no existe
        if (await this.checkInDatabase(tag || '')) {
            return {
                status: false,
                message: 'El tag existe en la base de datos, intenta con otro tag',
                tag: null
            };
        }
        // Si valida las opciones anteriores, venir aquí y crear el documento
        const tagObject = {
            id: await asignDocumentId(this.getDb(), this.collection, { id: -1}),
            name: tag,
            slug: slugify(tag || '', { lower: true })
        };
        const result = await this.add(this.collection, tagObject, 'tag');
        return { status: result.status, message: result.message, tag: result.item };
    }
    async modify() {
        const id = this.getVariables().id;
        const tag = this.getVariables().tag;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del tag no se ha especificado correctamente',
                tag: null
            };
        }
        if (!this.checkData(tag || '')) {
            return {
                status: false,
                message: 'El tag no se ha especificado correctamente',
                tag: null
            };
        }
        const objectUpdate = { 
            name: tag,
            slug: slugify(tag || '', {lower: true})
        };
        
        const result = await this.update(this.collection, { id }, objectUpdate, 'genero');
        return { status: result.status, message: result.message, tag: result.item };
    }

    async delete() {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del tag no se ha especificado correctamente',
                tag: null
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
                message: 'El ID del tag no se ha especificado correctamente',
                tag: null
            };
        }
        const result = await this.update(this.collection, { id }, { active: unblock }, 'tag');
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

export default TagsService;