const { Juniors, Company, Publication, Admins } = require('../../models/index');

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const postPublications = async (req, res) => {
	const { nameUser, idUser } = req.query;
	const { description, photograph } = req.body;

	try {
		const token = req.headers['x-auth-token'];
		if (!token) {
			return res.status(403).json({ auth: false, message: 'token is require' });
		}

		if (!description)
			return res.status(404).json({ message: 'Falta la descripción' });
		if (!nameUser)
			return res
				.status(404)
				.json({ message: 'No se le asigno un usuario a la publicación' });
		if (!idUser)
			return res
				.status(404)
				.json({ message: 'No se le asigno un id a la publicación' });

		if (nameUser && idUser) {
			if (nameUser == 'companies') {
				var company = idUser;
				var getCompany = await Company.findById(idUser);
			}

			if (nameUser == 'juniors') {
				var junior = idUser;
				var getJunior = await Juniors.findById(idUser);
			}

			if (nameUser == 'admin') {
				var admin = idUser;
				var getAdmin = await Admins.findById(idUser);
			}

			if (getCompany || getJunior || getAdmin) {
				var postCreated = await Publication.create({
					description: description,
					photograph: photograph,
					company: getCompany,
					junior: getJunior,
					admin: getAdmin,
				});

				if (company) {
					await Company.findOneAndUpdate(
						{ _id: idUser },
						{
							publications: getCompany.publications.concat(postCreated._id),
						}
					);
				}

				if (junior) {
					await Juniors.findOneAndUpdate(
						{ _id: idUser },
						{
							publications: getJunior.publications.concat(postCreated._id),
						}
					);
				}

				if (admin) {
					await Admins.findOneAndUpdate(
						{ _id: idUser },
						{
							publications: getAdmin.publications.concat(postCreated._id),
						}
					);
				}
				res.json(postCreated);
			}
			return;
		}
		res.status(404).json({ message: 'Parametros incorrectos' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getPublications = async (req, res) => {
	const { numberPage } = req.query;

	try {
		const token = req.headers['x-auth-token'];
		if (!token) {
			return res.status(403).json({ auth: false, message: 'token is require' });
		}

		const publications = await Publication.find().populate([
			{ path: 'company' },
			{ path: 'junior' },
			{ path: 'admin' },
		]);

		if (numberPage === 'false')
			return res.json({
				publications,
				pages: false,
				finishPage: 0,
			});

		let pages = Math.ceil(publications.length / 8);

		let publicationsSort = publications.sort(function (a, b) {
			if (a._id > b._id) {
				return -1;
			}
			if (a._id < b._id) {
				return 1;
			}
			return 0;
		});

		let publicationsLimit = publicationsSort.slice(
			8 * numberPage - 8,
			8 * numberPage
		);

		let finishPage = numberPage == pages ? true : false;

		res.json({
			publications: publicationsLimit,
			pages: pages,
			finishPage: finishPage,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getPublicationsById = async (req, res) => {
	const { id } = req.params;

	try {
		const token = req.headers['x-auth-token'];
		if (!token) {
			return res.status(403).json({ auth: false, message: 'token is require' });
		}

		const getPublication = await Publication.findById(id).populate([
			{ path: 'company' },
			{ path: 'junior' },
			{ path: 'admin' },
			{ path: 'likes' },
		]);

		if (!getPublication)
			return res.status(404).json({ message: 'La publicación no existe' });

		res.json([getPublication]);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const putPublication = async (req, res) => {
	const token = req.headers['x-auth-token'];
	if (!token) {
		return res.status(403).json({ auth: false, message: 'Token is required' });
	}

	const decoded = await jwt.verify(token, SECRET);

	const { idPublication, idUser } = req.query;

	const getPublication = await Publication.findById(idPublication).populate([
		{ path: 'company' },
		{ path: 'junior' },
		{ path: 'admin' },
	]);

	//-------------------------------BUSCA AL JUNIOR----------------------------------
	if (getPublication.junior) {
		var user = await Juniors.findOne({ idFireBase: decoded.id });

		if (!user) {
			return res.status(404).json({ auth: false, message: 'user not found' });
		}
	}

	if (
		getPublication.junior &&
		getPublication.junior.idFireBase !== decoded.id
	) {
		return res.status(401).json({ auth: false, message: 'unauthorizad user' });
	}

	//-------------------------------BUSCA A LA COMPAÑIA------------------------------
	if (getPublication.company) {
		var user = await Company.findOne({ idFireBase: decoded.id });

		if (!user) {
			return res.status(404).json({ auth: false, message: 'user not found' });
		}
	}

	if (
		getPublication.company &&
		getPublication.company.idFireBase !== decoded.id
	) {
		return res.status(401).json({ auth: false, message: 'unauthorizad user' });
	}

	const { description, photograph } = req.body;

	try {
		if (user._id == idUser) {
			const updatePublicatio = await Publication.findByIdAndUpdate(
				idPublication,
				{
					description: description,
					photograph: photograph,
				},
				{ new: true }
			);

			res.json(updatePublicatio);
		} else
			res
				.status(404)
				.json({ message: 'La publicación no le pertenece al usuario' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const deletePublication = async (req, res) => {
	const { idPublication, idUser, userType } = req.query;

	try {
		const token = req.headers['x-auth-token'];
		if (!token) {
			return res.status(403).json({ auth: false, message: 'token is require' });
		}

		if (userType == 'juniors') {
			let junior = Juniors.findById(idUser);
			const publication = Publication.findById(idPublication);

			let [getJunior, getPublication] = await Promise.all([
				junior,
				publication,
			]);

			getJunior.publications = getJunior.publications.filter(
				(e) => !e.equals(getPublication._id)
			);
			let newJunior = await getJunior.save();

			await Publication.findByIdAndDelete(idPublication);

			res.json(getPublication);
		} else if (userType == 'companies') {
			let company = Company.findById(idUser);
			const publication = Publication.findById(idPublication);

			let [getCompany, getPublication] = await Promise.all([
				company,
				publication,
			]);

			getCompany.publications = getCompany.publications.filter(
				(e) => !e.equals(getPublication._id)
			);
			let newCompanyr = await getCompany.save();

			await Publication.findByIdAndDelete(idPublication);

			res.json(getPublication);
		}
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	postPublications,
	getPublications,
	getPublicationsById,
	putPublication,
	deletePublication,
};
