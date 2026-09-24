const pool = require("../config/db");

const createUser = (data) => {
  const { user_id, username, email, passwordHash, role } = data;
  return pool.query(
    `INSERT INTO "users"("id", "name", "email", "password", "role")
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, username, email, passwordHash, role],
  );
};

const createWorkerProfile = (data) => {
  const { id, user_id, city, province, last_work, description, skills } = data;
  return pool.query(
    `INSERT INTO "worker_profiles"("id", "user_id", "city", "province", "last_work", "description", "skills")
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [id, user_id, city, province, last_work, description, skills],
  );
};

const createCompanyProfile = (data) => {
  const {
    id,
    user_id,
    company_name,
    company_email,
    company_phone,
    company_field,
    city,
    province,
    description,
  } = data;
  return pool.query(
    `INSERT INTO "company_profiles"("id", "user_id", "company_name", "company_email", "company_phone", "company_field", "city", "province", "description")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      id,
      user_id,
      company_name,
      company_email,
      company_phone,
      company_field,
      city,
      province,
      description,
    ],
  );
};

module.exports = {
  createUser,
  createWorkerProfile,
  createCompanyProfile,
};
