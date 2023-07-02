const DEBUG = process.env.DEBUG;
const { Patient, Report } = require("../models/Patient.model");
const createPatient = async (req, res) => {
  try {
    const { name, phone } = req.body;
    // Validation
    if (!name || !phone) {
      return res.status(400).json({ msg: "Please enter all feild" });
    }
    //checking the patient exists or not 
     const patientCheck = await Patient.findOne({ phone });
    //if exists then return patient info
    if (patientCheck) {
      const reports = await Report.find({ patient: patientCheck._id })
        .populate({
          path: "doctor",
          select: "-password -register_date -__v -_id", // Exclude the 'password register_date , version and id' field
        })
        .exec();;
      const result = {
        patient: patientCheck,
        reports:reports
      }
      return res.status(200).json(result);
     }
    // Create a new patient using name and phone
    const newPatient = new Patient({
      name: name,
      phone: phone,
      register_doctor: req.user.id,
    });
    // Save the new patient object to MongoDB using Mongoose
    const savedPatient = await newPatient.save();
    const result = {
      patient: savedPatient,
    };
    res.status(200).json(result);
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};
const createReport = async (req, res) => {
  try {
    const { status } = req.body;
    // Create a new report object 
    const newReport = new Report({
      status: status,
      doctor: req.user.id,
      patient: req.params.id,
    });
    // Save the new Report object in mongoDB
    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};
const getPatientReport = async (req, res) => {
  try {
    const patientId = req.params.id;
    //validation params
    if (!patientId) {
       return res.status(400).json({ msg: "Please Enter patient Id in params" });
    }
    //checking patient exists or not 
    const patientCheck = await Patient.findById(patientId);
    //if exists then get the report of patient
   if (patientCheck) {
     const reports = await Report.find({ patient: patientId })
       .populate({
         path: "doctor",
         select: "-password -register_date -__v -_id", // Exclude the 'password register_date , version and id' field
       })
       .exec();
     const result = {
       patient: patientCheck,
       reports: reports,
     };
     return res.status(200).json(result);
   }
    res.status(200).json({message :"Patient not found"});
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};
const getPatientStatusReport = async (req, res) => {
  try {
    const patientStatus = req.params.status;
    //validation 
     if (!patientStatus) {
       return res
         .status(400)
         .json({ msg: "Please Enter patient Status in params" });
    }
    //Getting data from db using doctorId and status
     const reports = await Report.find({
       status: patientStatus,
       doctor: req.user.id,
     })
       .populate({
         path: "patient doctor",
         select: "-register_doctor -register_date -__v -_id -password", // Exclude the 'password register_date , version and id' field
       })
       .exec();
    if (!reports) {
     return res.status(200).json({message :"Incorrect Status"});
    }
     const result = {
       reports: reports,
     };
    return res.status(200).json(result);
    
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatient,
  createReport,
  getPatientReport,
  getPatientStatusReport,
};
