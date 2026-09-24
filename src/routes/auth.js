const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { validate, registerSchema } = require("../middleware/validate");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
