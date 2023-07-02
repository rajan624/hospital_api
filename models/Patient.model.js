const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validStatuses = [
  "Negative",
  "Travelled - Quarantine",
  "Symptoms - Quarantine",
  "Positive - Admit",
];
const Doctor = require("./Doctor.model");

// Define the ReportSchema
const ReportSchema = new Schema(
  {
    // Report fields
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    status: {
      type: String,
      validate: {
        validator: function (value) {
          return validStatuses.includes(value);
        },
        message: "Invalid status value",
      },
      default: "Negative",
      required: true,
    },
    created_date: { type: Date, default: Date.now },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  },
  { versionKey: false }
);

// Define the PatientSchema
const PatientSchema = new Schema(
  {
    // Patient fields
    register_doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    register_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Create the models
const Report = mongoose.model("Report", ReportSchema);
const Patient = mongoose.model("Patient", PatientSchema);

module.exports = { Patient, Report };
