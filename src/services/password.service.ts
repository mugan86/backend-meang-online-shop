import { IContextData } from './../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';
import MailService from './mail.service';
import JWT from '../lib/jwt';
import { findOneElement } from '../lib/db-operations';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import bcrypt from 'bcrypt';
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
    console.log(user);
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
    console.log(token);
    return new MailService().send(mail);
  }

  async change() {
    const id = this.getVariables().user?.id;
    let password = this.getVariables().user?.password;
    // comprobar que el id es correcto: no indefinido y no en blanco
    if (id === undefined || id === '') {
      return {
        status: false,
        message: 'El ID necesita una información correcta'
      };
    }
    // comprobar que el password es correcto: no indefinido y no en blanco
    if (password === undefined || password === '' || password === '1234') {
      return {
        status: false,
        message: 'El password necesita una información correcta'
      };
    }
    // Encriptar el password
    password = bcrypt.hashSync(password, 10);
    // Actualizar en el id seleccionado de la coleccion usuarios
    const result = await this.update(
      COLLECTIONS.USERS,
      { id },
      { password },
      'users'
    ) ;

    return {
      status: result.status,
      message: (result.status) ? 'Contraseña cambiada correctamente' :
                                  result.message
    };
  }
}

export default PasswordService;
