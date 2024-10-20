const express = require('express')
const router = express.Router()
const treatmentController= require('../controllers/treatment')
router.post('/addTreatmentData', treatmentController.addTreatmentData);
router.get('/getAllTreatmentData', treatmentController.getAllTreatmentData);
router.get('/getTreatmentDataById/:id', treatmentController.getTreatmentDataById);
router.get('/getTreatmentDataByUserId/:userId', treatmentController.getTreatmentDataByUserId);
router.delete('/deleteTreatmentDataById/:id', treatmentController.deleteTreatmentDataById)
router.post('/readSensorColor', treatmentController.readSensorColor)
router.post('/readSensorFinalColor', treatmentController.readSensorFinalColor)
router.post('/computeFormula', treatmentController.computeFormula)
router.post('/modifyFormula', treatmentController.modifyFormula)
router.post('/produceFormula', treatmentController.produceFormula)
router.patch('/updatetreatment', treatmentController.updateWishedColor)
router.patch('/updateQuantity', treatmentController.updateQuantity)
// router.patch('/updateChemistryDataById/:id', chemistryController.updateChemistryDataById)

module.exports = router;