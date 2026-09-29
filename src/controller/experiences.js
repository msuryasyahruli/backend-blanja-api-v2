const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  findId,
} = require("../model/experiences");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const experienceController = {
  getExperiences: async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await getExperiences(id);
      if (!rows.length) {
        return res.status(404).json({
          message: "Experience not found",
        });
      }

      commonHelper.response(res, rows, 200, "Get experiences successful");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createExperience: async (req, res) => {
    try {
      const {
        user_id,
        position,
        company_name,
        working_start,
        working_end,
        description,
      } = req.body;

      const result = await createExperience({
        id: uuidv4(),
        user_id,
        position,
        company_name,
        working_start,
        working_end,
        description,
      });

      commonHelper.response(
        res,
        result.rows,
        201,
        "Create experience successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        position,
        company_name,
        working_start,
        working_end,
        description,
      } = req.body;
      const rowCount = await findId(id);
      if (!rowCount) {
        return res.status(404).json({
          message: "Experience not found",
        });
      }

      const data = {
        position,
        company_name,
        working_start,
        working_end,
        description,
      };

      const result = await updateExperience(data, id);

      commonHelper.response(
        res,
        result.rows,
        200,
        "Update experience successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteExperience(id);
      commonHelper.response(
        res,
        result.rows,
        200,
        "Delete experience successful",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = experienceController;
