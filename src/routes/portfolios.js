const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portfolios");
const { validate, portfolioSchema } = require("../middleware/validate");

router.get("/user/:id", portfolioController.getPortfolios);
router.get("/:id", portfolioController.getDetailPortfolio);
router.post(
  "/",
  validate(portfolioSchema),
  portfolioController.createPortfolio,
);
router.put("/:id", portfolioController.updatePortfolio);
router.delete("/:id", portfolioController.deletePortfolio);

module.exports = router;
