const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        secure: false,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user:'sumukhasureban@gmail.com',
            pass:''
        }
    }
);

const sendEmail = async function(to){
    transporter.sendMail({
        to:to,
        subject:'signup testing',
        html: `<h1>Hello World</h1>`
    });

    console.log('Email sent');
}

sendEmail('sumukhasureban2002@gmail.com');

 