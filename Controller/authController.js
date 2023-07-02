const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor.model");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all feilds" });
  }

  try {
    // Check exisitng User
    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });
    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, {
      expiresIn: 3600000,
    });
    if (!token) return res.status(500).json({ msg: "Internal Server Error" });
    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all feilds" });
  }

  try {
    const mailCheck = await Doctor.findOne({ email });
    if (mailCheck) return res.status(400).json({ msg: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing password");

    const newDoctor = new Doctor({
      name: name,
      email: email,
      password: hash,
    });

    const savedDoctor = await newDoctor.save();
    if (!savedDoctor) throw Error("Something went wrong saving the Doctor");
    const token = jwt.sign({ id: savedDoctor._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: savedDoctor._id,
        name: savedDoctor.firstName,
        email: savedDoctor.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  login,
  signUp,
};
