const {Chemistry,sequelize} = require("../db/index");
const { Sequelize } = require('sequelize');
const HttpError = require("../models/http-error");
const crypto = require("crypto");
const addChemistryData = async (req, res, next) => {
  try {
    const { name, lastname, color_data } = req.body;

    console.log(color_data, 'color_data');
    console.log(typeof(color_data), 'color_data');

    if (!name || !lastname || !color_data) {
      return next(new HttpError("Please fill the complete form!", 400));
    }

    const {
      color_033, color_11, color_42, color_50,
      color_566, color_100, oxytype, oxygen, exposure
    } = color_data;

    if (
      color_033 === undefined || color_11 === undefined || color_42 === undefined ||
      color_50 === undefined || color_566 === undefined || color_100 === undefined ||
      oxytype === undefined || oxygen === undefined || exposure === undefined
    ) {
      return next(new HttpError("Please provide complete color data!", 400));
    }

    const insertQuery = `
      INSERT INTO chemistries (name, lastname, color_data)
      VALUES (:name, :lastname, ROW(:color_033, :color_11, :color_42, :color_50, :color_566, :color_100, :oxytype, :oxygen, :exposure)::color_type)
      RETURNING *;
    `;

    const result = await sequelize.query(insertQuery, {
      replacements: {
        name,
        lastname,
        color_033,
        color_11,
        color_42,
        color_50,
        color_566,
        color_100,
        oxytype,
        oxygen,
        exposure
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
};
const getAllChemistryData = (req,res, next ) =>{
  Chemistry.findAll({ order: [["createdAt", "ASC"]] })
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
const getChemistryDataById=(req, res, next)=>{
  Chemistry.findByPk(req.params.id)

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

const deleteChemistryDataById= (req, res, next)=>{
  try {
    Chemistry.findByPk(req.params.id)
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

exports.addChemistryData=addChemistryData
exports.getAllChemistryData=getAllChemistryData
exports.getChemistryDataById=getChemistryDataById
exports.deleteChemistryDataById=deleteChemistryDataById