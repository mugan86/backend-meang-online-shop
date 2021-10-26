import StripeApi, { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../lib/stripe-api';
import { IStripeCustomer } from '../../interfaces/stripe/customer.interface';
import { IUser } from '../../interfaces/user.interface';
import { findOneElement } from '../../lib/db-operations';
import UsersService from '../users.service';
import { COLLECTIONS } from '../../config/constants';
import { Db } from 'mongodb';

class StripeCustomerService extends StripeApi {
  // Clientes lista
  async list(limit: number, startingAfter: string, endingBefore: string) {
    const pagination = this.getPagination(startingAfter, endingBefore);
    return await this
      .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.LIST, {
        limit,
        ...pagination,
      })
      .then((result: { has_more: boolean; data: Array<IStripeCustomer> }) => {
        return {
          status: true,
          message:
            'Lista cargada correctamente con los clientes seleccionados',
          hasMore: result.has_more,
          customers: result.data,
        };
      })
      .catch((error: Error) => this.getError(error));
  }
  async get(id: string) {
    return await this
    .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.GET, id)
    .then(async (result: IStripeCustomer) => {
      return {
        status: true,
        message: `El cliente ${result.name} se ha obtenido correctamente`,
        customer: result,
      };
    })
    .catch((error: Error) => this.getError(error));
  }
  async add(name: string, email: string, db: Db) {
      // COmprobar que el cliente no existe y en el caso de que exista,
      // devolver diciendo que no se puede añadir
      const userCheckExist: {
        data: Array<IStripeCustomer>;
      } = await this.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.LIST,
        { email }
      );
      if (userCheckExist.data.length > 0) {
        // Usuario existe
        return {
          status: false,
          message: `El usuario con el email ${email} ya existe en el sistema`,
        };
      }
      return await this
        .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.CREATE, {
          name,
          email,
          description: `${name} (${email})`,
        })
        .then(async (result: IStripeCustomer) => {
            // Actualizar en nuestra base de datos con la nueva 
            // propiedad que es el id del cliente
            const user: IUser = await findOneElement(db, COLLECTIONS.USERS, { email }) as IUser;
            if (user) {
                user.stripeCustomer = result.id;
                const resultUserOperation = await new UsersService({}, { user }, {db}).modify();
                console.log(resultUserOperation);
                // Si el resultado es falso, no se ha ejecutado. Tenemos que borrar el cliente creado  (en Stripe)
            }
            return {
            status: true,
            message: `El cliente ${name} se ha creado correctamente`,
            customer: result,
          };
        })
        .catch((error: Error) => this.getError(error));
  }
  async update(id: string, customer: IStripeCustomer) {
    return await this.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.UPDATE,
        id,
        customer
      ).then((result: IStripeCustomer) => {
        return {
          status: true,
          message: `Usuario ${id} actualizado correctamente`,
          customer: result
        };
      }).catch((error: Error) =>  this.getError(error));
  }
  async delete(id: string, db: Db) {
    return await this.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.DELETE,
        id
      ).then(async(result: {id: string, deleted: boolean}) => {
        if (result.deleted) {
          const resultOperation = await db
          .collection(COLLECTIONS.USERS)
          .updateOne({stripeCustomer: result.id}, { $unset: { stripeCustomer: result.id } });
          return {
            status: result.deleted && resultOperation ? true : false,
            message: result.deleted && resultOperation ? 
                      `Usuario ${id} borrado correctamente` : 
                      `Usuario no se ha borrado correctamente en la base de datos nuestra`,
          };
        }
        return {
          status: false,
          message: `Usuario ${id} NO SE HA borrado. Compruebalo`,
        };
        
      }).catch((error: Error) =>  this.getError(error)); 
  }

}

export default StripeCustomerService;
