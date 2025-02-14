const { Router } = require("express");
const { conn, Subscriber } = require("../db.js");
const { newSubscriber, sendNewsletter } = require("../middleware/subscriberMiddleware.js");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: '../../.env'});

const app = Router();
app.use(cors());

app.get('/', async (req,res) => {
    try {
        const emails = await Subscriber.findAll();

        if(!emails) {
            return res.send( 'Actualmente no hay emails suscriptos al boletin.' );
        }

        return res.send(emails);

    } catch (error) {
        console.error('Error al ver a los suscriptos:', error);
        return res.status(500).json({ error: 'Error al encontrar los suscriptos' });
    }
})

app.post('/', async (req,res) => {
    const t = await conn.transaction();
    const { email } = req.body;
    try {
        const existingSubscriber = await Subscriber.findOne({ where:{email: email} });

        if (existingSubscriber) {
            return res.send('Email actualmente registrado.');
        }

        const subscriber = await Subscriber.create(
            { email },
            { transaction: t }
        );
        
        await newSubscriber(email, subscriber.uuid);

        await t.commit();

        return res.json({message: 'Suscripcion exitosa, gracias por elegirnos!.'});
    } catch (error) {
        console.error('Error al intentar suscribirse:', error);
        return res.status(500).json({ error: 'Error al suscribirse' });
    }
});

app.post('/newsletter', async (req,res) => {
    try {
        const { title } = req.body;
        const emails = await Subscriber.findAll();
        
        if(!title) return res.status(400).json({ error: 'El dato solicitado no puede ser nulo o estar vacio.' });

        if(!emails) return res.status(200).send('Actualmente no hay emails suscriptos al boletin.');

        for(let i = 0; i < emails.length; i++){
            let email = emails[i].dataValues.email;
            var content = `<p>Hemos creado un nuevo post que podria interesarte! <a href="${process.env.CLIENT_URL}/read/${title}"><span>${title}</span></a></p></br><p>Este mensaje se envió a ${email}. Si no quieres recibir estos correos electrónicos de Meta en el futuro, <a href="${process.env.CLIENT_URL}/unsubscribe?email=${emails[i].dataValues.uuid}"><span>cancela tu suscripción.</span></a>
        </br>Boom Studio, Atencion: Soporte, ${process.env.ADDRESS}.</p>`;
        
        await sendNewsletter(email, '¡Nuevo post creado!',content);
        }

        return res.send('Mails enviados exitosamente.');
        
    } catch (error) {
        console.error('Error al enviar el boletin:', error);
        return res.status(500).json({ error: 'Error al enviar' });
    }
});

app.delete('/:uuid', async (req,res) => {
    try {
        const uuid = req.params.uuid;
        const existingSubscriber = await Subscriber.findOne({ where:{uuid: uuid} });

        if (!existingSubscriber || !uuid) return res.status(404).send('El email no se encuentra registrado o la direccion es incorrecta.');

        await Subscriber.destroy({
            where: { uuid: uuid },
        });
        
        return res.status(200).send('El email se removio del boletin de forma exitos, esperamos vuelva pronto.');

    } catch (error) {
        console.error('Error al intentar desuscribirse:', error);
        return res.status(500).json({ error: 'Error al desuscribirse' });
    }
});

module.exports = app;