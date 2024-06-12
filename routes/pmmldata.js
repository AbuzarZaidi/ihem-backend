const express = require('express')
const router = express.Router()
const pmmldataController= require('../controllers/pmmldata')
router.post('/addPmmlData', pmmldataController.addPmmlData);
router.get('/getAllPmmlData', pmmldataController.getAllPmmlData);
router.get('/getPmmlDataById/:id', pmmldataController.getPmmlDataById);
router.delete('/deletePmmlDataById/:id', pmmldataController.deletePmmlDataById)
router.patch('/updatePmmlDataById/:id', pmmldataController.updatePmmlDataById)
module.exports = router;