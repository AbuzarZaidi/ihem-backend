const express = require('express')
const cors = require('cors');
const bodyParser=require('body-parser')
const HttpError = require('./models/http-error');
const router =require('./router')
const {sequelize}=require('./db/index')
const app = express()
app.use(bodyParser.json())
app.use(cors());
const port=process.env.PORT||4000;
// app.use(router)
app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  })
  app.use((error,req,res,next)=>{
    res.status(error.code || 500);
    res.json({success:false, message: error.message || 'An unknown error occurred!' });
  })
//   sequelize.sync({force:true}).then(result=>{
//   console.log(result)

// }).catch(err=>{
//   console.log(err)
// });
  // app.listen()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })