const {PMMLData} = require("../db/index");
const HttpError = require("../models/http-error");
const crypto = require("crypto");

//Add PmmlData
const addPmmlData= async(req, res, next)=>{
  try {
      const { devicetype, pmml } = req.body;
      if (!devicetype || !pmml) 
       {
        return next(new HttpError("Please fill the complete form!", 200));
      }
      PMMLData.create({
        devicetype,
        pmml
      })
        .then((result) =>
          res.status(200).json({
            success: true,
            message: "Data Successfully Created!",
            data: result,
          })
        )
        .catch((err) => {
          console.log(err,'err')
          return next(new HttpError("Data not created Try Again Later!", 200));
        });
    } catch (error) {
      console.log(error,'error')
      new HttpError("Something Went Wrong Please Try Later.", 500);
    }
}
const getAllPmmlData = (req,res, next ) =>{
  PMMLData.findAll()
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "Data Fetch Successfully!",
      data: result,
    });
  })
  .catch((err) => {
    console.log(err)
    return next(new HttpError("Data cannot fetch try again later!", 200));
  });
}
const getPmmlDataById=(req, res, next)=>{
  PMMLData.findByPk(req.params.id)

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

const deletePmmlDataById= (req, res, next)=>{
  try {
    PMMLData.findByPk(req.params.id)
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

const updatePmmlDataById = async (req,res,next) => {
try {
  const data = req.body;
  for (let key in data) {
    if (data[key] === "")
      return next(new HttpError("Please fill the complete form!", 200));
  }
  const result = await PMMLData.update(data, {
    where: { id: req.params.id },
  });
  if (result[0] === 0) {
    return next(new HttpError("Data does not exist", 200));
  } else {
    res.status(200).json({
      success: true,
      message: "Data Request Update Successfully!",
      result: result,
    });
  }
} catch (err) {
  return next(new HttpError("Something Went Wrong Please Try Later.", 500));
}
};

exports.addPmmlData = addPmmlData;
exports.getAllPmmlData =getAllPmmlData;
exports.getPmmlDataById =getPmmlDataById;
exports.deletePmmlDataById= deletePmmlDataById;
exports.updatePmmlDataById= updatePmmlDataById;