const express = require('express');
const router = express.Router();
const pmmldataRoutes=require('./routes/pmmldata')

router.use('/pmmldata', pmmldataRoutes)
module.exports=router