import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from '../interfaces/context-data.interface';
import { COLLECTIONS } from '../config/constants';
import { findOneElement } from '../lib/db-operations';

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
        const genreName = this.getVariables().genre || '';
        // Comprobar que genero tiene informacion
        if (!this.checkData(genreName)) {
            return { status: false, message: 'Item no definido correctamente', genre: null };
        }
        // COmprobar que no existe en la coleccion
        // Si Existe nos dará error que no podemos aññadir
        if (this.checkGenreExist(genreName)) {
            return { status: false, message: 'Item definido ya existe. Prueba con otro', genre: null };
        }
        // const result = await this.add(this.collection, {id: '84', name: 'Realidad Virtual', slug: 'realidad-virtual'}, 'genero');
        // console.log(result);
    }

    private checkData(genre: string) {
        return (genre === '' || genre === undefined) ? false : true;
    }

    private async checkGenreExist(genre: string) {
        return await findOneElement(this.getDb(), COLLECTIONS.GENRES, {
            name: genre
        });
    }
}

export default GenresService;