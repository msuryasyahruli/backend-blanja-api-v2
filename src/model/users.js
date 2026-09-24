const pool = require("../config/db");

const getUser = (limit, offset, sortby, sort) => {
  return pool.query(`SELECT
    u."id",
    u."name",
    u."email",
    u."role",
    wp.*
    FROM "worker_profiles" wp
    LEFT JOIN "users" u
    ON wp."user_id" = u."id"
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const getWorkerProfile = (id) => {
  return pool.query(
    `SELECT *
    FROM "users" u
    LEFT JOIN "worker_profiles" wp
    ON u."id" = wp."user_id"
    WHERE u."id" = $1`,
    [id],
  );
};

const getCompanyProfile = (id) => {
  return pool.query(
    `SELECT *
    FROM "users" u
    LEFT JOIN "company_profiles" wp
    ON u."id" = wp."user_id"
    WHERE u."id" = $1`,
    [id],
  );
};

const updateProfile = (data, id) => {
  const { username, email, password } = data;
  return pool.query(
    `UPDATE "users" SET 
    "name"=COALESCE($1, name),
    "email"=COALESCE($2, email),
    "password"=COALESCE($3, password),
    "updated_at"=NOW() 
    WHERE "id"=$4 
    RETURNING *`,
    [username, email, password, id],
  );
};

const updateWorkerProfile = (data, id) => {
  const { city, province, last_work, description } = data;
  return pool.query(
    `UPDATE "worker_profiles" SET 
    "city"=COALESCE($1, city),
    "province"=COALESCE($2, province),
    "last_work"=COALESCE($3, last_work),
    "description"=COALESCE($4, description), 
    "updated_at"=NOW() 
    WHERE "id"=$5 
    RETURNING *`,
    [city, province, last_work, description, id],
  );
};

const updateCompanyProfile = (data, id) => {
  const {
    company_name,
    company_email,
    company_phone,
    company_field,
    city,
    province,
    description,
  } = data;
  return pool.query(
    `UPDATE "company_profiles" SET 
    "company_name"=COALESCE($1, company_name),
    "company_email"=COALESCE($2, company_email),
    "company_phone"=COALESCE($3, company_phone),
    "company_field"=COALESCE($4, company_field),
    "city"=COALESCE($5, city),
    "province"=COALESCE($6, province),
    "description"=COALESCE($7, description), 
    "updated_at"=NOW() 
    WHERE "id"=$8 
    RETURNING *`,
    [
      company_name,
      company_email,
      company_phone,
      company_field,
      city,
      province,
      description,
      id,
    ],
  );
};

const updateSkills = (data) => {
  const { user_id, skills } = data;
  return pool.query(
    `UPDATE "worker_profiles" SET "skills"=$1, "updated_at"=NOW() WHERE "user_id"=$2 RETURNING *`,
    [skills, user_id],
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    ),
  );
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM "users" WHERE "id"=$1`, [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    }),
  );
};

const countData = () => {
  return pool.query(`SELECT COUNT(*) FROM worker_profiles`);
};

module.exports = {
  getUser,
  getWorkerProfile,
  getCompanyProfile,
  updateProfile,
  updateWorkerProfile,
  updateCompanyProfile,
  updateSkills,
  findEmail,
  findId,
  countData,
};
