const express = require('express');
const router = express.Router();
const pmmldataRoutes=require('./routes/pmmldata')
const chemistryRoutes=require('./routes/chemistry')

router.use('/pmmldata', pmmldataRoutes)
router.use('/chemistry', chemistryRoutes)
module.exports=router