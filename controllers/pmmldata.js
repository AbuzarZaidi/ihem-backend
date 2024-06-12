const {PMMLData} = require("../db/index");
const HttpError = require("../models/http-error");
const crypto = require("crypto");

const addPmmlData= async(req, res, next)=>{}
const getAllPmmlData= async(req, res, next)=>{}
const getPmmlDataById= async(req, res, next)=>{}
const deletePmmlDataById= async(req, res, next)=>{}
const updatePmmlDataById= async(req, res, next)=>{}

exports.addPmmlData = addPmmlData;
exports.getAllPmmlData =getAllPmmlData;
exports.getPmmlDataById =getPmmlDataById;
exports.deletePmmlDataById= deletePmmlDataById;
exports.updatePmmlDataById= updatePmmlDataById;