const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    register_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Export the Doctor model directly
module.exports = mongoose.model("Doctor", doctorSchema);
