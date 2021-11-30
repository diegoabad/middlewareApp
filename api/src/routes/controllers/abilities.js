const {
    Languages,
    Technologies,
    States,
} = require ('../../models/index')

const getAllLaguages = async (req, res) => {
    try{
    const allLanguages = await Languages.find();
    res.json(allLanguages);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAllTechnologies = async (req, res) => {
    try{
    const allTechnologies = await Technologies.find();
    res.json(allTechnologies);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getUbication = async (req, res) => {
    
    try{
    const allStates = await States.find();
    const country = allStates.map(state => state.name_country);
    
    const countryNoRepeat = [...new Set(country)];
    res.json({countryNoRepeat, allStates});

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { getAllLaguages, getAllTechnologies, getUbication }