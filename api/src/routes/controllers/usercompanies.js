const {
  Languages,
  Technologies,
  Company,
  Publication,
  Juniors,
  Jobs,
} = require("../../models/index");

const { decoder } = require("../../helpers/index");

require("dotenv").config();

const { SECRET } = process.env;

const jwt = require("jsonwebtoken");

const getAllCompanies = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    // const result = await decoder(token, "Junior");

    // if (result.auth === false) {
    //   return res.status(401).json(result);
    // }

    const allCompanies = await Company.find()
      .populate("jobs")
      .populate("technologies");
    res.json(allCompanies);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCompaniesById = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    // const result = await decoder(token, "Junior");

    const { id } = req.params;
    const { firebase } = req.query;

    // if (result.auth === false && !firebase) {
    //   return res.status(401).json(result);
    // }

    if (firebase === "true") {
      const getCompanyr = await Company.findOne({ idFireBase: id }).populate([
        { path: "technologies" },
        { path: "publications" },
        { path: "jobs" },
      ]);

      res.json(getCompanyr);
      return;
    }

    const companiesGet = await Company.findById(id).populate("jobs");

    if (companiesGet) return res.json(companiesGet);

    res.status(404).json({ message: "The company not exist" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateCompaniesProfile = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    const { id } = req.params;

    const result = await decoder(token, "Company", id);

    if (result.auth === false) {
      return res.status(401).json(result);
    }

    const {
      name,
      webpage,
      gmail,
      description,
      photograph,
      country,
      city,
      linkedin,
      latitude,
      longitude,
      idFireBase,
    } = req.body;

    // const languagesGet = await Languages.find({ name: languages });

    const CompaniesChange = await Company.findOneAndUpdate(
      {
        idFireBase: id,
      },
      {
        name: name,
        webpage: webpage,
        gmail: gmail,
        photograph:
          photograph || "https://www.w3schools.com/howto/img_avatar.png",
        country: country,
        city: city,
        linkedin,
        description: description,
        latitude: latitude,
        longitude: longitude,
      },
      { new: true }
    );

    res.json(CompaniesChange);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteCompaniesProfile = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    const { id } = req.params;

    const result = await decoder(token, "Company", id);

    if (result.auth === false) {
      return res.status(401).json(result);
    }

    // const getCompany = await Company.findOne({idFireBase: result.idFireBase});
    if (result.userType === "admin") {
      const user = await Company.findOne({ idFireBase: id });
      user.publications.forEach(async (e) => {
        await Publication.findByIdAndDelete(e._id);
      });
      user.jobs.forEach(async (e) => {
        await Jobs.findByIdAndDelete(e._id);
        await Company.findOneAndDelete({ idFireBase: id });
      });
      await Company.findOneAndDelete({ idFireBase: id });
      return res.json({ message: "Deleted", deleted: true });
    }

    result.publications.forEach(async (e) => {
      await Publication.findByIdAndDelete(e._id);
    });

    result.jobs.forEach(async (e) => {
      await Jobs.findByIdAndDelete(e._id);
    });

    await Company.findOneAndDelete({ idFireBase: id });

    res.json({ message: "Deleted", deleted: true });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllCompanies,
  getCompaniesById,
  updateCompaniesProfile,
  deleteCompaniesProfile,
};
