const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
  SoftSkills,
  Jobs,
} = require("../../models/index");

const { decoder } = require("../../helpers/index");

require("dotenv").config();

const { SECRET } = process.env;

const jwt = require("jsonwebtoken");

const getAllJuniors = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    // const result = await decoder(token, "Company");

    // if (result.auth === false) {
    //   return res.status(401).json(result);
    // }

    const allJuniors = await Juniors.find().populate([
      { path: "languages" },
      { path: "technologies" },
      { path: "softskills" },
      { path: "publications" },
      { path: "postulationsJobs" },
    ]);
    res.json(allJuniors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getJuniorById = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    // const result = await decoder(token, "Company");

    const { id } = req.params;
    const { firebase } = req.query;

    // if (result.auth === false && !firebase) {
    //   return res.status(401).json(result);
    // }

    if (firebase === "true") {
      const getJunior = await Juniors.findOne({ idFireBase: id }).populate([
        { path: "languages" },
        { path: "technologies" },
        { path: "softskills" },
        { path: "publications" },
      ]);

      res.json(getJunior);
      return;
    }

    Juniors.findById(id)
      .populate("languages")
      .populate("technologies")
      .populate("softskills")
      .populate("publications")
      .populate("postulationsJobs")
      .exec((err, junior) => {
        if (err) {
          res.status(404).json({ message: err.message });
        } else {
          if (!junior)
            return res.status(404).json({ message: "junior not found" });
          res.status(200).send(junior);
        }
      });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateJuniorsProfile = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    console.log(token);
    if (!token) {
      return res.status(403).json({ auth: false, message: "token is require" });
    }

    const decoded = await jwt.verify(token, SECRET);

    const user = await Juniors.findOne({ idFireBase: decoded.id });
    if (!user) {
      return res.status(404).json({ auth: false, message: "junior not found" });
    }

    const { id } = req.params;

    const result = await decoder(token, "Junior", id);

    if (result.auth === false) {
      return res.status(401).json(result);
    }

    if (id !== decoded.id) {
      return res
        .status(401)
        .json({ auth: false, message: "authorization required" });
    }

    const {
      name,
      gmail,
      github,
      photograph,
      phone,
      title,
      linkedin,
      city,
      description,
      languages,
      technologies,
      publications,
      softskills,
      website,
      jobsExperience,
      academicHistory,
      openToRelocate,
      openToRemote,
      openToFullTime,
    } = req.body;

    const juniorsChange = await Juniors.findOneAndUpdate(
      {
        idFireBase: id,
      },
      {
        name,
        gmail,
        github,
        photograph:
          photograph || "https://www.w3schools.com/howto/img_avatar.png",
        website,
        title,
        phone,
        linkedin,
        city,
        description,
        languages,
        technologies,
        publications,
        softskills,
        jobsExperience,
        academicHistory,
        openToRelocate,
        openToRemote,
        openToFullTime,
      },
      { new: true }
    );

    res.json(juniorsChange);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// const updateUserNotifications = async ( req, res) => {
// try {
  
//   const token = req.headers["x-auth-token"];

//   if (!token) {
//     return res.status(403).json({ auth: false, message: "token is require" });
//   }

//   const {idUserPublication, idUserLike, type, userName, userType, idPublications} = req.body;

//   console.log("Entro en el back", idUserPublication, idUserLike, type, userName, userType, idPublications)

//   var user = await Juniors.findById(idUserPublication)
//   if(!user){
//     user = await Company.findById(idUserPublication)
//   }


//   user.notifications = user.notifications.concat([{
//     _id: idUserLike,
//     userName: userName,
//     typeNotification: type,
//     idPublication: idPublications,
//     userType: userType
//   }])


//   var newUserNotifications = await user.save()


//   res.json(newUserNotifications)
// } catch (error) {
//   console.log(error);
// }
// }

const deleteNotifications = async (req, res) => {

  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(403).json({ auth: false, message: "token is require" });
  }

  const {idUser, typeNotification} = req.query;

  var user = await Juniors.findById(idUser)
  if(!user){
    user = await Company.findById(idUser)
  }

  if(typeNotification === "true"){


    user.notifications = user.notifications.filter(e => e && e.typeNotification !== 3)

    try {
      var resetNotifications = await user.save()

    res.json(resetNotifications)
    } catch (error) {
      console.log(error);
    }
  }else {

    user.notifications = []

    var resetNotifications = await user.save()

    res.json(resetNotifications)
  }


}


const deleteJuniorsProfile = async (req, res) => {
  // try {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(403).json({ auth: false, message: "token is require" });
  }

  const { id } = req.params;

  const result = await decoder(token, "Junior", id);

  if (result.auth === false) {
    return res.status(401).json(result);
  }
  if (result.userType === "admin") {
    const user = await Juniors.findOne({ idFireBase: id });
    user.publications.forEach(async (e) => {
      await Publication.findByIdAndDelete(e._id);
    });
    await Juniors.findOneAndDelete({ idFireBase: id });

    return res.json({ message: "Deleted", deleted: true })
  }

  result.publications.forEach(async (e) => {
    await Publication.findByIdAndDelete(e._id);
  });

  // const usr = Juniors.findOne({ idFireBase: id })
  await Juniors.findOneAndDelete({ idFireBase: id });

  res.json({ message: "Deleted", deleted: true });
  // } catch (err) {
  //   res.status(404).json({ message: err.message });
  // }
};

module.exports = {
  getAllJuniors,
  getJuniorById,
  updateJuniorsProfile,
  deleteJuniorsProfile,

  deleteNotifications
};
