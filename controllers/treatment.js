const {Treatment,sequelize} = require("../db/index");
const { Sequelize } = require('sequelize');
const HttpError = require("../models/http-error");
const crypto = require("crypto");
// router.post('/addTreatmentData', treatmentController.addTreatmentData);
const addTreatmentData = async (req, res, next) => {
  try {

    console.log(req.body,'req.boby')
    const uuid_user=req.body.userId
   const isTreatmentExist = await Treatment.findOne({where:{uuid_user:req.body.userId}})
   if(isTreatmentExist){
    res.status(200).json({
      success: true,
      message: "Treatment already exist!",
      data: isTreatmentExist
    });
   }else{
    const lastIdQuery = `
    SELECT table_id FROM treatment ORDER BY table_id DESC LIMIT 1;
  `;

  const lastIdResult = await sequelize.query(lastIdQuery, {
    type: Sequelize.QueryTypes.SELECT
  });

  let tableId = 1; // default to 1 if table is empty
  if (lastIdResult.length > 0) {
      tableId = parseInt(lastIdResult[0].table_id) + 1;
  }
  console.log(tableId,'tableId')
  const insertQuery = `
    INSERT INTO treatment (
      table_id,uuid_user
    )
    VALUES (
      :tableId,
      :uuid_user
    )
    RETURNING *;
  `;
  
  const result = await sequelize.query(insertQuery, {
    replacements: {
      tableId,
      uuid_user
    },
    type: Sequelize.QueryTypes.INSERT
  });

  res.status(200).json({
    success: true,
    message: "Data Successfully Created!",
    // data: result[0]
  });
   }
      
  } catch (error) {
    console.log(error, 'error');
    return next(new HttpError("Something Went Wrong Please Try Later.", 500));
  }
}
const getAllTreatmentData = async(req,res, next ) =>{
  // const device='pump1'
  // const result = await sequelize.query("SELECT list_netdevices('2') AS alias", {
  //   type: sequelize.QueryTypes.SELECT,
  // });
  // console.log(result,'result')
  // const [results, metadata] = await sequelize.query(
  //   'SELECT public.read_sensor(:device) AS sensor_data',
  //   {
  //     replacements: { device },
  //     type: Sequelize.QueryTypes.SELECT
  //   }
  // );
  // console.log(results,'results')
  Treatment.findAll()
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "Data Fetch Successfully!",
      data: result,
    });
  })
  .catch((err) => {
    console.log(err,'err')
    return next(new HttpError("Data cannot fetch try again later!", 200));
  });
}
const getTreatmentDataById=(req, res, next)=>{
  Treatment.findByPk(req.params.id)

  .then((result) => {
    res.status(200).json({
      success: true,
      message: "Data Fetch Successfully!",
      data: result,
    });
  })
  .catch((err) => {
    return next(new HttpError("Data cannot fetch try again later!", 200));
  });
}
const getTreatmentDataByUserId=(req, res, next)=>{
  Treatment.findOne({where:{uuid_user:req.params.userId}})
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "Data Fetch Successfully!",
      data: result,
    });
  })
  .catch((err) => {
    return next(new HttpError("Data cannot fetch try again later!", 200));
  });
}
const deleteTreatmentDataById= (req, res, next)=>{
  try {
    Treatment.findByPk(req.params.id)
        .then((val) => {
          return val.destroy();
        })
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "Data Delete Successfully!",
            result: result,
          });
        })
        .catch((err) => {
          return next(new HttpError("Data not Found!", 200));
        });
    } catch (error) {
      new HttpError("Something Went Wrong Please Try Later.", 500);
    }
}
const readSensorColor = async(req,res,next)=>{
try {
 
     const treatmentRecord= await Treatment.findOne({ where: { uuid_user: req.body.userId },raw: true });
     console.log(treatmentRecord,'treatmentRecord')
     console.log(treatmentRecord.table_id,'id')
const treatmentId = treatmentRecord.table_id;
    const device = 'sensor1';
    const isInitial = true; 
    await sequelize.query(
      'CALL public.read_sensor(:treatmentId, :device, :isInitial)',
      {
          replacements: { treatmentId, device, isInitial },
          type: Sequelize.QueryTypes.RAW
      }
  );
    
  const response= await Treatment.findOne({ where: { uuid_user: req.body.userId },raw: true });
  console.log(response,'response')
  res.status(200).json({
    success: true,
    message: "Read Scanner Working!",
    currColor:response.currcolor,
    gotColor:response.gotcolor
  });
} catch (error) {
  console.log(error)
  new HttpError("Something Went Wrong Please Try Later.", 500);
    
}
}
const readSensorFinalColor = async(req,res,next)=>{
  try {
   
       const treatmentRecord= await Treatment.findOne({ where: { uuid_user: req.body.userId },raw: true });
       console.log(treatmentRecord,'treatmentRecord')
       console.log(treatmentRecord.table_id,'id')
  const treatmentId = treatmentRecord.table_id;
      const device = 'sensor1';
      const isInitial = false; 
      await sequelize.query(
        'CALL public.read_sensor(:treatmentId, :device, :isInitial)',
        {
            replacements: { treatmentId, device, isInitial },
            type: Sequelize.QueryTypes.RAW
        }
    );
      
    const response= await Treatment.findOne({ where: { uuid_user: req.body.userId },raw: true });
    console.log(response,'response')
    res.status(200).json({
      success: true,
      message: "Read Scanner Working!",
      currColor:response.currcolor,
      gotColor:response.gotcolor
    });
  } catch (error) {
    console.log(error)
    new HttpError("Something Went Wrong Please Try Later.", 500);
      
  }
  }
const updateQuantity=async(req,res,next)=>{
  try {
    const response = await Treatment.update({quantity:req.body.quantity}, {
      where: {uuid_user: req.body.userId },
    });
    res.status(200).json({
      success: true,
      message: "Quantity update successfully Successfully!",
    });
  } catch (error) {
    new HttpError("Something Went Wrong Please Try Later.", 500);
  }
}
const computeFormula = async(userId)=>{
  try {
       const treatmentRecord= await Treatment.findOne({ where: { uuid_user: userId },raw: true });
       console.log(treatmentRecord,'treatmentRecord')
       console.log(treatmentRecord.table_id,'id')
  const treatmentId = treatmentRecord.table_id;
      await sequelize.query(
        'CALL public.compute_formula(:treatmentId)',
        {
            replacements: { treatmentId},
            type: Sequelize.QueryTypes.RAW
        }
        
    );
  return
    // If you need to return a response
    // res.status(200).json({
    //   success: true,
    //   message: "Compute formula executed successfully!",
    // });
  } catch (error) {
    return false
    // console.log(error)
    // new HttpError("Something Went Wrong Please Try Later.", 500);
      
  }
  }
  const modifyFormula = async(userId,color,percentage)=>{
    try {
         const treatmentRecord= await Treatment.findOne({ where: { uuid_user: userId },raw: true });
        //  console.log(treatmentRecord,'treatmentRecord')
    const treatmentId = treatmentRecord.table_id;
    // const color = color;
    // const percentage = percentage;
        await sequelize.query(
          'CALL public.modify_formula(:treatmentId, :color, :percentage)',
          {
              replacements: { treatmentId,color,percentage},
              type: Sequelize.QueryTypes.RAW
          }
      );
      return
    
      // If you need to return a response
      //   res.status(200).json({
      //   success: true,
      //   message: "Modify formula executed successfully!",
      // });
    } catch (error) {
      return false
        
    }
    }
    const updateWishedColor=async(req,res,next)=>{
      try {
        console.log(req.body,'req.body')
        const response = await Treatment.update({
          wishedcolor: req.body.wishedcolor??0,
          quantity: req.body.quantity ?? 0,
          currcolor: req.body.currColor ?? 0,
        }, {
          where: { uuid_user: req.body.userId ?? 0 },
        });
        if(req.body.addionalColor&&req.body.additionColorQuantity){
          console.log("yes")
          await modifyFormula(req.body.userId,req.body.addionalColor,req.body.additionColorQuantity)
        }
        res.status(200).json({
          success: true,
          message: "Treatment update Successfully!",
        });
      } catch (error) {
        new HttpError("Something Went Wrong Please Try Later.", 500);
      }
    }
  const produceFormula = async(req,res,next)=>{
    try {
      
      await computeFormula(req.body.userId)
         const treatmentRecord= await Treatment.findOne({ where: { uuid_user: req.body.userId },raw: true });
         console.log(treatmentRecord,"click")
         if(!treatmentRecord.currcolor||!treatmentRecord.wishedcolor||!treatmentRecord.quantity||treatmentRecord.wishedcolor== '0.0'||treatmentRecord.currcolor== '0.0'||treatmentRecord.wishedcolor== '0'||treatmentRecord.currcolor== '0'){
          res.status(200).json({
            success: false,
            message: "Something is missing to run eco mixer. Please make sure you update desire color,quantity and run scanner!",
            // message: "Produce formula function executed successfully!",
            // data:results
          });
         }else{
          const id = treatmentRecord.table_id;
          const pm = 'pump1';
           const [results, metadata] = await sequelize.query('SELECT * FROM produce_formula(:id, :pm)', {
      replacements: { id, pm },
      type: Sequelize.QueryTypes.SELECT, // Specify the type of query
    });
    res.status(200).json({
      success: true,
      message: "Mixer is Working!",
      // message: "Produce formula function executed successfully!",
      // data:results
    });
         }
    
   

   
    } catch (error) {
      console.log(error)
      new HttpError("Something Went Wrong Please Try Later.", 500);
        
    }
    }
exports.addTreatmentData=addTreatmentData
exports.getTreatmentDataByUserId=getTreatmentDataByUserId
exports.updateWishedColor=updateWishedColor
exports.computeFormula=computeFormula
exports.modifyFormula=modifyFormula
exports.produceFormula=produceFormula
exports.updateQuantity=updateQuantity
exports.readSensorColor=readSensorColor
exports.readSensorFinalColor=readSensorFinalColor
exports.getAllTreatmentData=getAllTreatmentData
exports.getTreatmentDataById=getTreatmentDataById
exports.deleteTreatmentDataById=deleteTreatmentDataById