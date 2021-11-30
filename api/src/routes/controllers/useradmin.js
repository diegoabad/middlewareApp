const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
} = require("../../models/index");

const { jwtgenerater } = require("../../helpers/index");

const adminRegister = async (req, res) => {
  const { fullName, gmail, idFireBase, userType, photograph } = req.body;
  try {
    const findAdmin = await Admins.findOne({ gmail });
    if (findAdmin) {
      const token = jwtgenerater(idFireBase);
      res.json({ auth: true, token: token, user: findAdmin });
      return;
    } else {
      res.json({ auth: false, message: "not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// const adminRegister = async (req, res) => {
//   // try{
//       const { fullName, gmail, idFireBase, userType } = req.body;

//       const adminCreate = await Admins.create({
//           fullName,
//           gmail:gmail,
//           idFireBase:idFireBase,
//           userType

//       })

//       res.json(adminCreate)
//   // }catch(err){
//   //     res.status(404).json({message: err.message})
//   // }
// }

const getAdmins = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const admin = await Admins.findById(id)
        .populate("publications", "description")
        .then((e) => {
          return res.json(e);
        });
      return;
    }

    const admins = await Admins.find();

    res.json(admins);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { adminRegister, getAdmins };
