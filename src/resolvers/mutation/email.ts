import { findOneElement, updateOneElement } from './../../lib/db-operations';
import { EXPIRETIME, MESSAGES, COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import JWT from '../../lib/jwt';
import UsersService from '../../services/users.service';
import bcrypt from 'bcrypt';
import MailService from '../../services/mail.service';
import PasswordService from '../../services/password.service';
const resolversMailMutation: IResolvers = {
  Mutation: {
    async sendEmail(_, { mail }) {
      return new MailService().send(mail);
    },
    async activeUserEmail(_, { id, email }) {
      return new UsersService(_, {user: {id, email}}, {}).active();
    },
    async activeUserAction(_, { id, birthday, password }, {token, db}) {
      const verify = verifyToken(token, id);
      if (verify?.status === false) {
        return { status: false, message: verify.message};
      }
      return new UsersService(_, { id, user: { birthday, password } }, {token, db}).unblock(true);
    },
    async resetPassword(_, {email}, {db}) {
      return new PasswordService(_, {user: {email}}, {db} ).sendMail();
    },
    async changePassword(_, { id, password}, { db, token }) {
      // verificar el token
      const verify = verifyToken(token, id);
      if (verify?.status === false) {
        return { status: false, message: verify.message};
      }
      // comprobar que el id es correcto: no indefinido y no en blanco
      if (id === undefined || id === '') {
        return {
          status: false,
          message: 'El ID necesita una información correcta'
        };
      }
      // comprobar que el password es correcto: no indefinido y no en blanco
      if (password === undefined || password === '') {
        return {
          status: false,
          message: 'El password necesita una información correcta'
        };
      }
      // Encriptar el password
      password = bcrypt.hashSync(password, 10);
      // Actualizar en el id seleccionado de la coleccion usuarios
      return await updateOneElement(
        db,
        COLLECTIONS.USERS,
        { id },
        { password }
      ).then(
        res => {
          if (res.result.nModified === 1 && res.result.ok) {
            return {
              status: true,
              message: `Contraseña cambiada correctamente`
            };
          }
          return {
            status: false,
            message: `Contraseña no actualizada por no encontrar el usuario o por no sufrir cambios`
          };
        }
      ).catch(
        error => {
          return {
            status: false,
            message: `Contraseña no actualizada: ${error}`
          };
        }
      );
    }
  },
};

function verifyToken(token: string, id: string) {
  // verificar el token
  const checkToken = new JWT().verify(token);
  if (checkToken === MESSAGES.TOKEN_VERICATION_FAILED) {
    return {
      status: false,
      message: 'El periodo para activar el usuario ha finalizado. Contacta con el administrador para más información.',
    };
  }
  // Si el token es valido , asignamos la información al usuario
  const user = Object.values(checkToken)[0];
  if (user.id !== id) {
    return {
      status: false,
      message: 'El usuario del token no corresponde al añadido en el argumento'
    };
  }
}

export default resolversMailMutation;