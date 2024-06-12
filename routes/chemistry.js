const express = require('express')
const router = express.Router()
const chemistryController= require('../controllers/chemistry')
router.post('/addChemistryData', chemistryController.addChemistryData);
router.get('/getAllChemistryData', chemistryController.getAllChemistryData);
router.get('/getChemistryDataById/:id', chemistryController.getChemistryDataById);
router.delete('/deleteChemistryDataById/:id', chemistryController.deleteChemistryDataById)
// router.patch('/updateChemistryDataById/:id', chemistryController.updateChemistryDataById)
module.exports = router;