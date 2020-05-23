import { IResolvers } from 'graphql-tools';
import { transport } from '../../config/mailer';

const resolversMailMutation: IResolvers = {
  Mutation: {
    async sendEmail() {
      return new Promise((resolve, reject) => {
        transport.sendMail({
            from: '"Gamezonia Online Shop 👻" <gamezonia.online.shop@gmail.com>', // sender address
            to: 'mugan86@gmail.com', // list of receivers
            subject: 'Hola ✔', // Subject line
            // text: '<b>Hola Anartz</b>', // plain text body
            html: '<b>Hello world?</b>', // html body
          }, (error, _) => {
              (error) ? reject(error) : resolve('Email correctamente enviado');
          });
      });
    }
  },
};

export default resolversMailMutation;