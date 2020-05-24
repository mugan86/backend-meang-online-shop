import { EXPIRETIME, MESSAGES } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';
import UsersService from '../../services/users.service';

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
    activeUserAction(_, {id, birthday, password}, {token, db}) {
      console.log(id, birthday, password);
      const checkToken = new JWT().verify(token);
      if (checkToken === MESSAGES.TOKEN_VERICATION_FAILED) {
        return {
          status: false,
          message: 'El periodo para actualizar el password ha sido finalizado. Prueba de nuevo generando una nueva respuesta'
        };
      }
      const user = Object.values(checkToken)[0];
      // Clase 7
      return new UsersService(_, {id, birthday, password }, {token, db}).unblock(true, {birthday, password});
      // clase 6
      return {
        status: true,
        message: 'Preparado para poder activar usuario'
      };
    }
  },
};

export default resolversMailMutation;