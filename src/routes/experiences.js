const express = require("express");
const router = express.Router();
const experienceController = require("../controller/experiences");
const { validate, experienceSchema } = require("../middleware/validate");

router.get("/user/:id", experienceController.getExperiences);
router.get("/:id", experienceController.detailExperience);
router.post(
  "/",
  validate(experienceSchema),
  experienceController.createExperience,
);
router.put("/:id", experienceController.updateExperience);
router.delete("/:id", experienceController.deleteExperience);

module.exports = router;
