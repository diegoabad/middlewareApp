const { Jobs, Company } = require('../../models/index');
const nodemailer = require('nodemailer'); // previamente hay que instalar nodemailer
require('dotenv').config();
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN, MIDDLEWARE_EMAIL, EMAIL_PASSWORD } = process.env;

mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

const create_preference = async (req, res) => {
	// try{
	const { idJob } = req.params;
	const { plan } = req.query;
	let product;

	if (plan === 'premium') {
		// const order = await Order.findOne({ _id: idJob });
		// const { price, user } = order;
		product = [
			{
				title: 'Premium',
				quantity: 1,
				unit_price: 900,
			},
		];
	} else {
		product = [
			{
				title: 'Standard',
				quantity: 1,
				unit_price: 600,
			},
		];
	}


	let preference = {
		items: product,
		external_reference: `${idJob}/${product[0].title}`,
		notification_url: 'https://hookb.in/VGLVqnXx0qHDrgoorlzJ',
		payment_methods: {
			excluded_payment_types: [
				{
					id: 'ticket',
				},
			],
			excluded_payment_methods: [
				{
					id: 'atm',
				},
			],
			installments: 1, //cant de cuotas
			default_payment_method_id: 'visa',
			default_installments: 1,
		},
		back_urls: {
			success: 'https://middlewareapp-new.herokuapp.com/feedback',
			failure: 'https://middlewareapp-new.herokuapp.com/feedback',
			pending: 'https://middlewareapp-new.herokuapp.com/feedback',
		},
		auto_return: 'approved',
	};


	mercadopago.preferences
		.create(preference)
		.then(function (response) {
			console.info('Se crea preferencia');
			console.log(response, 'respuesta');
			// console.log(response.body);
			res.send({ id: response.body.id, product: product[0].title });
		})
		.catch(function (error) {
			console.log(error);
		});

	// } catch (error) {
	//     res.status(404).json({ error: error.message });
	// }
};

const orderFeedback = async (req, res) => {
	try {
		const {
			payment_id,
			collection_status,
			merchant_order_id,
			external_reference,
			status,
		} = req.query;

		const reference = external_reference.split('/');
		const idJob = reference[0];
		const plan = reference[1];
		const level = plan === 'Premium' ? 2 : 1;

		const job = await Jobs.findOneAndUpdate(
			{ _id: idJob },
			{
				premium: level,
			},
			{ new: true }
		);

		const jobData = await Jobs.findOne({ _id: idJob }).populate({
			path: 'company',
		});
		const gmailCompany = jobData.company.gmail;

		const transporter = nodemailer.createTransport({
			//acá voy a crear los datos del correo del que envía
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: MIDDLEWARE_EMAIL,
				pass: EMAIL_PASSWORD,
			},
		});
		await transporter.sendMail({
			// acá los datos de a quien se le envía y qué se le envía, se puede mandar template html también incluso atachment o imágenes y documentos
			from: '"Middleware App " <info.MiddlewareApp@gmail.com>', // sender address
			to: `${gmailCompany}`, // list of receivers
			subject: `Tu Pago en Middleware fue ${collection_status}`, // Subject line
			html: `<b> Te comentamos que ya estas mejor posicionado en nuestra app!!
      Muchas gracias!!!
                      Saludos desde Middleware!!! </b>`,
		});

		return res.redirect('https://middlewareapp-new.vercel.app/home/juniors');
	} catch (error) {
		return res.redirect('https://middlewareapp-new.vercel.app/home/juniors');
	}
};

module.exports = {
	create_preference,
	orderFeedback,
};
