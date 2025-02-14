const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const fs = require("fs");
const path = require("path");

const newSubscriber = async (email, uuid) => {
    const gifPath = path.join(__dirname, "gracias.gif");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "¡Bienvenido a nuestro boletín!",
        text: "¡Muchas gracias por suscribirse!",
        html: `<p>Este mensaje se envió a ${email}. Si no quieres recibir estos correos electrónicos de Meta en el futuro, <a href="${process.env.CLIENT_URL}/unsubscribe/${uuid}"><span>cancela tu suscripción.</span></a>
        Boom Studio, Atención: Soporte, ${process.env.ADDRESS}.</p>
        </br>
        <div style="text-align:center;">
            <img src="cid:graciasgif" alt="gracias!" />
        </div>`,
        attachments: [
            {
                filename: "gracias.gif",
                path: gifPath,
                cid: "graciasgif"
            }
        ]
    };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
};


const sendNewsletter = async (email, subject, content) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: content,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = { sendNewsletter, newSubscriber };