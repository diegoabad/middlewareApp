const { Router } = require('express');

const router = Router()

const { signIn } = require('./controllers/userType')
const { getAllJuniors, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile, updateUserNotifications, deleteNotifications } = require('./controllers/userjunior')
const {getAllCompanies, getCompaniesById, updateCompaniesProfile, deleteCompaniesProfile} = require('./controllers/usercompanies')
const { getAllLaguages, getAllTechnologies, getUbication } = require('./controllers/abilities')
const { adminRegister, getAdmins } = require('./controllers/useradmin')
const { postPublications, getPublications, getPublicationsById, putPublication, deletePublication } = require('./controllers/publications');
const { updatePremiumCompany, getAllCompanyPremium } = require('./controllers/premiumCompany');
const { juniorsPostulations } = require ('./controllers/juniorPostulation')
const { postJobs, getAllJobs, getJobsById, deleteJob, putJobs } = require('./controllers/jobs');
const { orderFeedback, create_preference } = require('./controllers/mercadopago')

const { putLikes } = require('./controllers/addLikes');

router.post('/login', signIn);

router.get('/juniors', getAllJuniors);
router.get('/juniors/:id', getJuniorById);
router.put('/juniors/:id', updateJuniorsProfile);
router.delete('/juniors/:id', deleteJuniorsProfile);

//Notifications

router.delete('/notifications', deleteNotifications)

router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompaniesById); 
router.put('/companies/:id', updateCompaniesProfile);
router.delete('/companies/:id', deleteCompaniesProfile);

router.get('/languages', getAllLaguages);
router.get('/technologies', getAllTechnologies);
router.get('/ubication', getUbication);

router.get('/admin', getAdmins)
router.post('/admin', adminRegister);   
router.get('/publications', getPublications)
router.get('/publications/:id', getPublicationsById)
router.post('/publications', postPublications)
router.put('/publications', putPublication)
router.delete('/publications', deletePublication)

router.get('/premiumCompany', getAllCompanyPremium)
router.put('/premiumCompany/:id', updatePremiumCompany)


router.get('/jobs', getAllJobs)
router.get('/jobs/:id', getJobsById)
router.post('/jobs', postJobs)
router.put('/jobs/:id', putJobs)
router.delete('/jobs/:id', deleteJob)
router.put('/jobs/postulation/:id', juniorsPostulations)

router.put('/addLike', putLikes)

router.get('/feedback', orderFeedback);
router.get('/create_preference/:idJob', create_preference);

module.exports = router;

