const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user:'sumukhasureban@gmail.com',
            pass:'dpvsbawwjycwiirs'
        }
    }
);


const sendEmail =  function(email) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            to: email.sendTo,
            subject: email.title,
            html: `<p>${email.description}</p>`
        }, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return reject(error);  // Reject the promise with the error
            }
            console.log('Email sent:', info.response);
            resolve(info.response);  // Resolve the promise with the response
        });
    });
}


// sendEmail('sumukhasureban2002@gmail.com');
// 2xbbMNVl3OcWXlem
module.exports = sendEmail;

