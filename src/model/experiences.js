const pool = require("../config/db");

const getExperiences = (id) => {
  return pool.query(
    `SELECT * FROM experiences WHERE user_id = $1 ORDER BY working_start DESC`,
    [id],
  );
};

const getDetailExperience = (id) => {
  return pool.query(`SELECT * FROM experiences WHERE id = $1`, [id]);
};

const createExperience = (data) => {
  const {
    id,
    user_id,
    position,
    company_name,
    working_start,
    working_end,
    description,
  } = data;
  return pool.query(
    `INSERT INTO experiences (id, user_id, position, company_name, working_start, working_end, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      id,
      user_id,
      position,
      company_name,
      working_start,
      working_end,
      description,
    ],
  );
};

const updateExperience = (data, id) => {
  const { position, company_name, working_start, working_end, description } =
    data;
  return pool.query(
    `UPDATE experiences SET position = COALESCE($1, position), company_name = COALESCE($2, company_name), working_start = COALESCE($3, working_start), working_end = COALESCE($4, working_end), description = COALESCE($5, description) WHERE id = $6 RETURNING *`,
    [position, company_name, working_start, working_end, description, id],
  );
};

const deleteExperience = (id) => {
  return pool.query(`DELETE FROM experiences WHERE id = $1 RETURNING *`, [id]);
};

const findId = (id) => {
  return pool.query(`SELECT id FROM experiences WHERE id = $1`, [id]);
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  findId,
  getDetailExperience,
};
