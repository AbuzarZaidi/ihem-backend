const {Treatment,sequelize} = require("../db/index");
const { Sequelize } = require('sequelize');
const HttpError = require("../models/http-error");
const crypto = require("crypto");
// router.post('/addTreatmentData', treatmentController.addTreatmentData);
const addTreatmentData = async (req, res, next) => {
  try {
    const { sample, uuid_user, comments, currcolor, wishedcolor, gotcolor, quantity, recipe, recipehem } = req.body;
    if (!sample || !uuid_user || !comments || !currcolor|| !wishedcolor|| !gotcolor|| !quantity|| !recipe|| !recipehem) {
      return next(new HttpError("Please fill the complete form!", 400));
    }
    const {
      hair_type,
      thickness,
      position,
      growth,
      length,
      white_hair,
      density
    }=sample
    const {
      recipe_color_033,
      recipe_color_11,
      recipe_color_42,
      recipe_color_50,
      recipe_color_566,
      recipe_color_100,
      recipe_oxytype,
      recipe_oxygen,
      recipe_exposure
    } = recipe;
    const {
      recipehem_color_033,
      recipehem_color_11,
      recipehem_color_42,
      recipehem_color_50,
      recipehem_color_566,
      recipehem_color_100,
      recipehem_oxytype,
      recipehem_oxygen,
      recipehem_exposure
    } = recipehem;
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
      table_id,sample, uuid_user, comments, currcolor, wishedcolor, gotcolor, quantity, recipe, recipehem
    )
    VALUES (
      :tableId,
      ROW(:hair_type, :thickness, :position, :growth, :length, :white_hair, :density)::hair_sample,
      :uuid_user,
      :comments,
      :currcolor,
      :wishedcolor,
      :gotcolor,
      :quantity,
      ROW(:recipe_color_033, :recipe_color_11, :recipe_color_42, :recipe_color_50, :recipe_color_566, :recipe_color_100, :recipe_oxytype, :recipe_oxygen, :recipe_exposure)::color_type,
      ROW(:recipehem_color_033, :recipehem_color_11, :recipehem_color_42, :recipehem_color_50, :recipehem_color_566, :recipehem_color_100, :recipehem_oxytype, :recipehem_oxygen, :recipehem_exposure)::color_type
    )
    RETURNING *;
  `;
  
  const result = await sequelize.query(insertQuery, {
    replacements: {
tableId,
      hair_type,
      thickness,
      position,
      growth,
      length,
      white_hair,
      density,
      uuid_user,
      comments,
      currcolor,
      wishedcolor,
      gotcolor,
      quantity,
      recipe_color_033,
      recipe_color_11,
      recipe_color_42,
      recipe_color_50,
      recipe_color_566,
      recipe_color_100,
      recipe_oxytype,
      recipe_oxygen,
      recipe_exposure,
      recipehem_color_033,
      recipehem_color_11,
      recipehem_color_42,
      recipehem_color_50,
      recipehem_color_566,
      recipehem_color_100,
      recipehem_oxytype,
      recipehem_oxygen,
      recipehem_exposure
    },
    type: Sequelize.QueryTypes.INSERT
  });
  res.status(200).json({
    success: true,
    message: "Data Successfully Created!",
    data: result[0]
  });  
  } catch (error) {
    console.log(error, 'error');
    return next(new HttpError("Something Went Wrong Please Try Later.", 500));
  }
}
const getAllTreatmentData = async(req,res, next ) =>{
  const device='pump1'
  const result = await sequelize.query("SELECT list_netdevices('2') AS alias", {
    type: sequelize.QueryTypes.SELECT,
  });
  console.log(result,'result')
  const [results, metadata] = await sequelize.query(
    'SELECT public.read_sensor(:device) AS sensor_data',
    {
      replacements: { device },
      type: Sequelize.QueryTypes.SELECT
    }
  );
  console.log(results,'results')
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
    const isInitial = false; 
    await sequelize.query(
      'CALL public.read_sensor(:treatmentId, :device, :isInitial)',
      {
          replacements: { treatmentId, device, isInitial },
          type: Sequelize.QueryTypes.RAW
      }
  );

  // If you need to return a response
  res.status(200).send('Procedure executed successfully');
} catch (error) {
  console.log(error)
  new HttpError("Something Went Wrong Please Try Later.", 500);
    
}
}
const updateWishedColor=async(req,res,next)=>{
  try {
    const response = await Treatment.update({wishedcolor:req.body.wishedcolor}, {
      where: {uuid_user: req.body.userId },
    });
    return response
  } catch (error) {
    new HttpError("Something Went Wrong Please Try Later.", 500);
  }
}
const updateQuantity=async(req,res,next)=>{
  try {
    const response = await Treatment.update({quantity:req.body.quantity}, {
      where: {uuid_user: req.body.userId },
    });
    return response
  } catch (error) {
    new HttpError("Something Went Wrong Please Try Later.", 500);
  }
}
exports.addTreatmentData=addTreatmentData
exports.updateWishedColor=updateWishedColor
exports.updateQuantity=updateQuantity
exports.readSensorColor=readSensorColor
exports.getAllTreatmentData=getAllTreatmentData
exports.getTreatmentDataById=getTreatmentDataById
exports.deleteTreatmentDataById=deleteTreatmentDataById