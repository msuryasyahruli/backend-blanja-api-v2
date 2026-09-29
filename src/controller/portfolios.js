const {
  getPortfolios,
  getDetailPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  findId,
} = require("../model/portfolios");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const portfolioController = {
  getPortfolios: async (req, res) => {
    try {
      const { id: user_id } = req.params;
      const { rows } = await getPortfolios(user_id);
      if (!rows.length) {
        return res.status(404).json({ message: "Portfolios not found" });
      }
      commonHelper.response(res, rows, 200, "Get portfolios successful");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDetailPortfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await getDetailPortfolio(id);
      if (!rows.length) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      commonHelper.response(
        res,
        rows[0],
        200,
        "Get detail portfolio successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createPortfolio: async (req, res) => {
    try {
      const { user_id, app_name, type, link, photo } = req.body;
      const result = await createPortfolio({
        id: uuidv4(),
        user_id,
        app_name,
        type,
        link,
        photo,
      });
      commonHelper.response(
        res,
        result.rows,
        201,
        "Create portfolio successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updatePortfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const { app_name, type, link, photo } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      const result = await updatePortfolio(
        {
          app_name,
          type,
          link,
          photo,
        },
        id,
      );
      commonHelper.response(
        res,
        result.rows,
        200,
        "Update portfolio successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deletePortfolio: async (req, res) => {
    try {
      const { id } = req.params;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      const result = await deletePortfolio(id);
      commonHelper.response(
        res,
        result.rows,
        200,
        "Delete portfolio successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = portfolioController;
