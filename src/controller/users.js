const commonHelper = require("../helper/common");
const bcrypt = require("bcryptjs");
const {
  findId,
  getWorkerProfile,
  getCompanyProfile,
  updateProfile,
  updateWorkerProfile,
  updateCompanyProfile,
  updateSkills,
  getUser,
  countData,
} = require("../model/users");

const userController = {
  profile: async (req, res) => {
    try {
      const id = req.payload.id;
      const role = req.payload.role;
      const {
        rows: [user],
      } = role ? await getWorkerProfile(id) : await getCompanyProfile(id);
      delete user?.password;

      commonHelper.response(res, user, 200, "Profile retrieved successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  allWorker: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "ASC";
      const result = await getUser(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData();

      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "Profile retrieved successfully",
        pagination,
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const { rowCount } = await findId(id);
      const passwordHash = bcrypt.hashSync(password, 10);

      if (!rowCount) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const data = {
        username,
        email,
        password: passwordHash,
      };

      const result = await updateProfile(data, id);
      delete result.rows[0].password;
      return commonHelper.response(
        res,
        result.rows,
        200,
        "Profile updated successfully",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateWorkerProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { city, province, last_work, description } = req.body;
      const data = {
        city,
        province,
        last_work,
        description,
      };

      const result = await updateWorkerProfile(data, id);

      if (!result.rowCount) {
        s;
        return res.status(404).json({
          message: "Worker profile not found",
        });
      }

      return commonHelper.response(
        res,
        result.rows,
        200,
        "Worker profile updated successfully",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  updateCompanyProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        company_name,
        company_email,
        company_phone,
        company_field,
        city,
        province,
        description,
      } = req.body;

      const data = {
        company_name,
        company_email,
        company_phone,
        company_field,
        city,
        province,
        description,
      };

      const result = await updateCompanyProfile(data, id);

      if (!result.rowCount) {
        return res.status(404).json({
          message: "Company profile not found",
        });
      }

      return commonHelper.response(
        res,
        result.rows,
        200,
        "Company profile updated successfully",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  updateSkills: async (req, res) => {
    try {
      const { id } = req.params;
      const { skills } = req.body;

      const data = {
        user_id: id,
        skills,
      };

      const result = await updateSkills(data);

      if (!result.rowCount) {
        return res.status(404).json({
          message: "Worker profile not found",
        });
      }

      return commonHelper.response(
        res,
        result.rows,
        200,
        "Skills updated successfully",
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

module.exports = userController;
