const express = require('express')
const router = express.Router()
const treatmentController= require('../controllers/treatment')
router.post('/addTreatmentData', treatmentController.addTreatmentData);
router.get('/getAllTreatmentData', treatmentController.getAllTreatmentData);
router.get('/getTreatmentDataById/:id', treatmentController.getTreatmentDataById);
router.delete('/deleteTreatmentDataById/:id', treatmentController.deleteTreatmentDataById)
router.get('/readSensorColor', treatmentController.readSensorColor)
router.patch('/updateWishedColor', treatmentController.updateWishedColor)
// router.patch('/updateChemistryDataById/:id', chemistryController.updateChemistryDataById)

module.exports = router;