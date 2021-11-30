const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
} = require("../models/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const jwtgenerater =  (payload) => {
  const token =  jwt.sign({ id: payload }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};



const decoder = async (token, userType, id) => {
  
 try{
    const decoded = await jwt.verify(token, SECRET);
    if (userType === 'Company'){
      const user =  await Company.findOne({idFireBase : decoded.id});
      if (!user) {
        const admin = await Admins.findOne({idFireBase : decoded.id});
        if (!admin) {
          return {auth: false, message: "User not found"};
        }
        return {auth: true, userType:'admin', user: admin};
      }else{
        if (id){
          if (id !== decoded.id){
            return {auth: false, message: "Unauthorized user"};
          }
        }
      }
      return user; 
    }
    if (userType === 'Junior'){
      const user =  await Juniors.findOne({ idFireBase: decoded.id});
      if (!user) {
        const admin = await Admins.findOne({idFireBase : decoded.id});
        if (!admin) {
          return {auth: false, message: "User not found"};
        }
        return {auth: true,userType:'admin', user: admin};
      }else{
        if (id){
          if (id !== decoded.id){
            return {auth: false, message: "Unauthorized user"};
          }
        }
      }
      return user; 
    }
    return decoded;
  }catch(err){
    return {auth: false, message: "invalid token"}
  }
};

module.exports = {
  jwtgenerater,
  decoder,
};