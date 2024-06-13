const express = require('express');
const router = express.Router();
const pmmldataRoutes=require('./routes/pmmldata')
const chemistryRoutes=require('./routes/chemistry')
const treatmentRoutes=require('./routes/treatment')

router.use('/pmmldata', pmmldataRoutes)
router.use('/chemistry', chemistryRoutes)
router.use('/treatment', treatmentRoutes)
module.exports=router