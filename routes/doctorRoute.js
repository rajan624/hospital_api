const Router = require("express");
const router = Router.Router();
const doctorController = require("../Controller/doctorController")

// authenticate user
router.post("/register", doctorController.createPatient);
router.post("/:id/create_report", doctorController.createReport);
router.get("/:id/all_reports", doctorController.getPatientReport);
router.get("/reports/:status", doctorController.getPatientStatusReport);
module.exports = router;


