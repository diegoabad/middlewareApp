const { Juniors, Company } = require("../../models/index");
const { jwtgenerater } = require("../../helpers/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const signIn = async (req, res) => {
  //primera vez con email and pass
  if (req.body.emailAndPass) {
    const { gmail, userType } = req.body;
    if (userType === "juniors") {
      const user = await Juniors.findOne({ gmail });
      if (user) return res.json(user);
      return res.json({ noUser: true, gmail });
    }
    if (userType === "company") {
      const user = await Company.findOne({ gmail });
      if (user) return res.json(user);
      return res.json({ noUser: true, gmail });
    }
  }
  try {
    const { name, idUser, gmail, photograph, userType } = req.body;
    if (userType === "juniors") {
      const user = await Juniors.findOne({ gmail });

      if (!user) {
        const userCompany = await Company.findOne({ gmail });

        if (userCompany)
          return res.json({
            auth: false,
            msg: "El usuario"+ ' ' + gmail +' '+ "tiene una cuenta Empresa",
          });
        var juniorsCreate = await Juniors.create({
          idFireBase: idUser,
          name,
          gmail,
          userType,
          photograph:
            photograph || "https://www.w3schools.com/howto/img_avatar.png",
        });
      }

      const token =  await jwtgenerater(idUser)
      
      return res.json({ auth: true, token: token, user: juniorsCreate });
    }

    if (userType === "companies") {
      const user = await Company.findOne({ gmail });

      if (!user) {
        const userJunior = await Juniors.findOne({ gmail });

        if (userJunior)
          return res.json({
            auth: false,
            msg: "El usuario"+ ' '+ gmail+ ' ' + "tiene una cuenta Junior",
          });
        var CompanyCreate = await Company.create({
          idFireBase: idUser,
          name,
          gmail,
          userType,
          photograph:
            photograph || "https://www.w3schools.com/howto/img_avatar.png",
        });
      }

      const token = jwtgenerater(idUser)

      res.json({ auth: true, token: token, user: CompanyCreate });
      return;
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { signIn };
