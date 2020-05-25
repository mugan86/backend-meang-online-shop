import { IContextData } from './../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';
import MailService from './mail.service';
import JWT from '../lib/jwt';
import { findOneElement } from '../lib/db-operations';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';

class PasswordService extends ResolversOperationsService {
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }
  async sendMail() {
    const email = this.getVariables().user?.email || '';
    if (email === undefined || email === '') {
      return {
        status: false,
        message: 'El email no se ha definido correctamente',
      };
    }
    // Coger información del usuario
    const user = await findOneElement(this.getDb(), COLLECTIONS.USERS, {
      email,
    });
    // Si usuario es indefinido mandamos un mensaje que no existe el usuario
    if (user === undefined || user === null) {
      return {
        status: false,
        message: `Usuario con el email ${email} no existe`,
      };
    }
    const newUser = {
      id: user.id,
      email,
    };
    const token = new JWT().sign({ user: newUser }, EXPIRETIME.M15);
    const html = `Para cambiar de contraseña haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/reset/${token}">Clic aquí</a>`;
    const mail = {
      to: email,
      subject: 'Petición para cambiar de contraseña',
      html,
    };
    return new MailService().send(mail);
  }
}

export default PasswordService;
