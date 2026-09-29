const pool = require("../config/db");

const getPortfolios = (id) => {
  return pool.query(`SELECT * FROM portfolios WHERE user_id = $1`, [id]);
};

const getDetailPortfolio = (id) => {
  return pool.query(`SELECT * FROM portfolios WHERE id = $1`, [id]);
};

const createPortfolio = (data) => {
  const { id, user_id, app_name, type, link, photo } = data;
  return pool.query(
    `INSERT INTO portfolios (id, user_id, app_name, type, link, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id, user_id, app_name, type, link, photo],
  );
};

const updatePortfolio = (data, id) => {
  const { app_name, type, link, photo } = data;
  return pool.query(
    `UPDATE portfolios SET app_name = COALESCE($1, app_name), type = COALESCE($2, type), link = COALESCE($3, link), photo = COALESCE($4, photo) WHERE id = $5 RETURNING *`,
    [app_name, type, link, photo, id],
  );
};

const deletePortfolio = (id) => {
  return pool.query(`DELETE FROM portfolios WHERE id = $1 RETURNING *`, [id]);
};

const findId = (id) => {
  return pool.query(`SELECT id FROM portfolios WHERE id = $1`, [id]);
};

module.exports = {
  getPortfolios,
  getDetailPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  findId,
};
