'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const send = ({title, content, to} = {}) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.yeah.net',
        // port: 25,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'supportman@yeah.net', // generated ethereal user
            pass: 'wu95042900'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <supportman@yeah.net>', // sender address
        to: to || 'yunqiang.wu@hand-china.com', // list of receivers
        subject: title || 'Hello ✔', // Subject line
        // text: 'Hello world?', // plain text body
        html: content || '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
};

// send();

export default {
	send,
}