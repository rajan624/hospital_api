const Router = require("express");
const router = Router.Router();
const authController = require("../Controller/authController");
// routes
router.post("/login", authController.login);
router.post("/register", authController.signUp);

module.exports = router;
