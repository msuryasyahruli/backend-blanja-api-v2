const commonHelper = require("../helper/common");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { generateToken, refreshToken } = require("../helper/auth");
const { findEmail } = require("../model/users");
const {
  createUser,
  createWorkerProfile,
  createCompanyProfile,
} = require("../model/auth");

const authController = {
  register: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        role,
        city,
        province,
        last_work,
        description,
        skills,
        company_name,
        company_email,
        company_phone,
        company_field,
      } = req.body;

      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({ message: "Email is already taken" });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const user_id = uuidv4();
      const profile_id = crypto.randomUUID();

      const data = {
        user_id,
        username,
        email,
        passwordHash,
        role,
      };

      if (role) {
        let dataWorker = {
          id: profile_id,
          user_id,
          city,
          province,
          last_work,
          description,
          skills,
        };
        await createWorkerProfile(dataWorker);
      } else {
        let dataCompany = {
          id: profile_id,
          user_id,
          company_name,
          company_email,
          company_phone,
          company_field,
          city,
          province,
          description,
        };
        await createCompanyProfile(dataCompany);
      }

      const payload = {
        id: user_id,
        email: email,
        role: role,
      };

      const result = await createUser(data);
      delete result.rows[0].password;
      result.rows[0].token = generateToken(payload);
      result.rows[0].refreshToken = refreshToken(payload);
      commonHelper.response(res, result.rows, 201, "Register successful");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return res.json({ message: "Email is incorrect" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
      } else if (role !== user.role) {
        return res.json({
          message: `Email not listed as ${role ? "worker" : "recruiter"}`,
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      delete user.id;
      delete user.password;
      user.token = generateToken(payload);
      user.refreshToken = refreshToken(payload);
      commonHelper.response(res, user, 201, "Login successful");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  refreshToken: (req, res) => {
    const token = req.body.refreshToken;
    const decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);

    const payload = {
      email: decoded.email,
      role: decoded.role,
    };

    const result = {
      token: generateToken(payload),
      refreshToken: refreshToken(payload),
    };
    commonHelper.response(res, result, 201, "Token has refreshed");
  },
};

module.exports = authController;
