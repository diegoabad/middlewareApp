const { Juniors, Company, Jobs, Admins } = require ('../../models/index');
const { decoder } = require("../../helpers/index");

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');


const postJobs = async (req, res) => {

    const { title, description, photograph, country, city, salary, currency, date, technologies, companyId, idFireBase, premium, status, openToFullTime, openToRelocate, openToRemote } = req.body;

    const token = req.headers["x-auth-token"];

    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "token is require" });
    }

    const decoded = await decoder(token, SECRET);

      const company = await Company.findOne({ _id : companyId} );

      if (decoded.id !== company.idFireBase) {
        return res.status(403).json({ error: 'access denied' });
      }

        if(!title || company === null){
          
          return res.status(404).json({ error: 'required "Title or Company valid" is missing'})
        }

        const newJob = new Jobs({
            title,
            description,
            photograph: photograph ? photograph : company.photograph,
            country,
            city,
            salary,
            currency,
            date,
            technologies,
            company: company,
            premium,
            status,
            openToFullTime,
            openToRelocate,
            openToRemote,
        });

        try{
          const savedJob = await newJob.save();
          company.jobs = company.jobs.concat(savedJob._id);
          await company.save();
          res.json(savedJob);
        }
        catch(err){
          res.status(404).json({message: err.message})
        }
    }

const getAllJobs = async (req, res) => {

    try{

      const token = req.headers["x-auth-token"];
        
      if (!token) {
        return res
          .status(403)
          .json({ auth: false, message: "token is require" });
      }
      
      const result = await decoder(token,'Junior')

      if (result.auth === false) {

        return res.status(401).json(result);
      }

        const jobs = await Jobs.find().populate([{path: 'company'}, {path: 'technologies'}, {path: 'juniors'}])

        res.json(jobs)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const getJobsById = async (req, res) => {

    const { id } = req.params;

    try{

      const token = req.headers["x-auth-token"];
        
      if (!token) {
        return res
          .status(403)
          .json({ auth: false, message: "token is require" });
      }
      
      const result = await decoder(token,'Junior')

      if (result.auth === false) {

        return res.status(401).json(result);
      }

        const getJobs = await Jobs.findById(id)
        .populate([{path: 'company'}, {path: 'technologies'}, {path: 'juniors'}])

        if(!getJobs) return res.status(404).json({message: "The job doesn't exists"})
    
        res.json(getJobs)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const putJobs = async (req, res) => {
    
    const { id } = req.params; //id de job
   console.log(id, '/////');
      const { title, description, photograph, country, city, salary, currency, date, technologies, idCompany, idFireBase, premium, status, openToFullTime, openToRelocate, openToRemote } = req.body;
  
      const token = req.headers["x-auth-token"];
        
      if (!token) {
        return res
          .status(403)
          .json({ auth: false, message: "token is require" });
      }

      const decoded = await jwt.verify(token, SECRET);
      
        const company = await Company.findOne({ idCompany } );

      //   if (!company || company.idFireBase !== decoded.id) {
      //     return res.status(403).json({ error: 'access denied' });
      //   }

          if(!title){
            
            return res.status(404).json({ error: 'required "Title" is missing'})
          }
  
          const newJob = {
              title,
              description,
              photograph,
              country,
              city,
              salary,
              currency,
              date,
              technologies,
              company: company,
              premium,
              status,
              openToFullTime,
            openToRelocate,
            openToRemote,
          };
  
          try{
            const updatedJob = await Jobs.findByIdAndUpdate(id, newJob, {new: true})
  
            res.json(updatedJob)
          }
          catch(err){
            res.status(404).json({message: err.message})
          }
      }


const deleteJob = async (req, res) => {

  const { id } = req.params; //id del job
  const { idFireBase, _id } = req.body 

  try{

    const token = req.headers["x-auth-token"];
        
    if (!token) {
      return res
        .status(403) 
        .json({ auth: false, message: "token is require" });
    }
    
    const result = await decoder(token,'Company', idFireBase);

    if (result.auth === false) {
      return res.status(401).json(result);
    }

      const jobDeleted = await Jobs.findByIdAndDelete(id)
      res.json({message: "Job deleted"})

  }
  catch(err){
      res.status(404).json({message: err.message})
  }
}



module.exports = {
  postJobs,
  getAllJobs,
  getJobsById,
  deleteJob,
  putJobs
};


