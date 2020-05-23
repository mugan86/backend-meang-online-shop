import nodemailer from 'nodemailer';
import chalk from 'chalk';
export const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
});
transport.verify().then(() => {
    console.log('==================NODEMAILER CONFIG====================');
    console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
    console.log(`MESSAGE: ${chalk.greenBright('MAILER CONNECT!!')}`);
}).catch( error => {
    console.log('==================NODEMAILER CONFIG====================');
    console.log(`STATUS: ${chalk.redBright('OFFLINE')}`);
    console.log(`MESSAGE: ${chalk.redBright(error)}`);
});
