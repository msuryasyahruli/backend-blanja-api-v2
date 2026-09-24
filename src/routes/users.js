const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
const protect = require("../middleware/auth");
const {
  validate,
  workerProfileSchema,
  companyProfileSchema,
} = require("../middleware/validate");

router.get("/profile", protect, userController.profile);
router.get("/allworker", userController.allWorker);
router.patch("/profile/:id", protect, userController.updateProfile);
router.patch(
  "/worker-profile/:id",
  protect,
  validate(workerProfileSchema),
  userController.updateWorkerProfile,
);
router.patch(
  "/company-profile/:id",
  protect,
  validate(companyProfileSchema),
  userController.updateCompanyProfile,
);
router.put("/skills/:id", protect, userController.updateSkills);

module.exports = router;
