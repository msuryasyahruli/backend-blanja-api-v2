const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("A simple Node App is running on this server");
});
router.use("/user", require("./users"));
router.use("/auth", require("./auth"));
router.use("/experience", require("./experiences"));
router.use("/portfolio", require("./portfolios"));

module.exports = router;
