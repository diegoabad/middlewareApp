const {Company} = require ('../../models/index');

const updatePremiumCompany = async (req, res) => {

    const { id } = req.params;
    const { premium } = req.body;

    // try{
        
        const CompanyUpdate = await Company.findByIdAndUpdate(id, {
            premium: premium
        }, {new: true})
    
        res.json(CompanyUpdate)
    // }
    // catch(err){
    //     res.status(404).json({message: err.message})
    // }
}

const getAllCompanyPremium = async (req, res) => {

    const { id } = req.query;

    try{

        if(id){
            const result = await getCompanyPremiumById(id)
            res.json(result);
            return
        }

        var getCompanies = await Company.find()
    
        getCompanies = getCompanies.map(e => {
            return {
                id: e._id,
                name: e.name,
                gmail: e.gmail,
                premium: e.premium
            }
        })
    
        res.json(getCompanies)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const getCompanyPremiumById = async (id) => {

    try{

        var getCompanies = await Company.findById(id)
    
        getCompanies = {
                id: getCompanies._id,
                name: getCompanies.name,
                gmail: getCompanies.gmail,
                premium: getCompanies.premium
            }
    
        return getCompanies
    }
    catch(err){
        return {message: err.message}
    }
}

module.exports = {
    updatePremiumCompany,
    getAllCompanyPremium,
    getCompanyPremiumById
}