import { EXPIRETIME } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';

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
    }
  },
};

export default resolversMailMutation;