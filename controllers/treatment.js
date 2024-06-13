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
    const insertQuery = `
    INSERT INTO treatments (
      sample, uuid_user, comments, currcolor, wishedcolor, gotcolor, quantity, recipe, recipehem
    )
    VALUES (
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
const getAllTreatmentData = (req,res, next ) =>{
  Treatment.findAll({ order: [["createdAt", "ASC"]] })
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

exports.addTreatmentData=addTreatmentData
exports.getAllTreatmentData=getAllTreatmentData
exports.getTreatmentDataById=getTreatmentDataById
exports.deleteTreatmentDataById=deleteTreatmentDataById