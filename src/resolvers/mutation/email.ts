import { findOneElement, updateOneElement } from './../../lib/db-operations';
import { EXPIRETIME, MESSAGES, COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';
import UsersService from '../../services/users.service';
import bcrypt from 'bcrypt';
const resolversMailMutation: IResolvers = {
  Mutation: {
    async sendEmail(_, { mail }) {
        console.log(mail);
      return new Promise((resolve, reject) => {
        transport.sendMail({
            from: '"🕹️ Gamezonia Online Shop 🕹️" <gamezonia.online.shop@gmail.com>', // sender address
            to: mail.to, // list of receivers
            subject: mail.subject, // Subject line
            html: mail.html, // html body
          }, (error, _) => {
              (error) ? reject({
                  status: false,
                  message: error
              }) : resolve({
                  status: true,
                  message: 'Email correctamente enviado a ' + mail.to,
                  mail
              });
          });
      });
    },
    async activeUserEmail(_, { id, email }) {
      const token = new JWT().sign({user: {id, email}}, EXPIRETIME.H1);
      const html = `Para activar la cuenta haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/active/${token}">Clic aquí</a>`;
      return new Promise((resolve, reject) => {
        transport.sendMail({
            from: '"🕹️ Gamezonia Online Shop 🕹️" <gamezonia.online.shop@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Activar usuario', // Subject line
            html
          }, (error, _) => {
              (error) ? reject({
                  status: false,
                  message: error
              }) : resolve({
                  status: true,
                  message: 'Email correctamente enviado a ' + email
              });
          });
      });
    },
    async activeUserAction(_, { id, birthday, password }, {token, db}) {
      verifyToken(token, id);
      return new UsersService(_, { id, user: { birthday, password } }, {token, db}).unblock(true);
    },
    async resetPassword(_, {email}, {db}) {
      // Coger información del usuario
      const user = await findOneElement(db, COLLECTIONS.USERS, { email});
      // Si usuario es indefinido mandamos un mensaje que no existe el usuario
      if (user === undefined || user === null) {
        return {
          status: false,
          message: `Usuario con el email ${email} no existe`
        };
      }
      const newUser = {
        id: user.id,
        email
      };
      const token = new JWT().sign({user: newUser}, EXPIRETIME.M15);
      const html = `Para cambiar de contraseña haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/reset/${token}">Clic aquí</a>`;
      return new Promise((resolve, reject) => {
        transport.sendMail({
            from: '"🕹️ Gamezonia Online Shop 🕹️" <gamezonia.online.shop@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Petición para cambiar de contraseña', // Subject line
            html
          }, (error, _) => {
              (error) ? reject({
                  status: false,
                  message: error
              }) : resolve({
                  status: true,
                  message: 'Email correctamente enviado a ' + email
              });
          });
      });
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