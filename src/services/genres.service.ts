import { COLLECTIONS } from './../config/constants';
import { findOneElement, asignDocumentId } from './../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import slugify from 'slugify';
class GenresService extends ResolversOperationsService {
    collection = COLLECTIONS.GENRES;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
    async items() {
        const result = await this.list(this.collection, 'géneros');
        return { status: result.status, message: result.message, genres: result.items };
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
            id: await asignDocumentId(this.getDb(), this.collection, { id: -1}),
            name: genre,
            slug: slugify(genre || '', { lower: true })
        };
        const result = await this.add(this.collection, genreObject, 'género');
        return { status: result.status, message: result.message, genre: result.item };
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