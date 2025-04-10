// controllers/workController.js
const pool = require('../config/db');

// Listar todas as obras do usuário
const getAllWorks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM works WHERE user_id = $1 ORDER BY updated_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar obras' });
  }
};

// Adicionar uma nova obra
const createWork = async (req, res) => {
  const { title, type, total_episodes, episodes_watched, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO works (user_id, title, type, total_episodes, episodes_watched, status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, title, type, total_episodes, episodes_watched, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar obra' });
  }
};

// Atualizar uma obra
const updateWork = async (req, res) => {
  const { id } = req.params;
  const { title, type, total_episodes, episodes_watched, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE works SET 
        title = $1, type = $2, total_episodes = $3, 
        episodes_watched = $4, status = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 AND user_id = $7 RETURNING *`,
      [title, type, total_episodes, episodes_watched, status, id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Obra não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar obra' });
  }
};

// Deletar uma obra
const deleteWork = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM works WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Obra não encontrada' });
    res.json({ message: 'Obra deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar obra' });
  }
};

module.exports = {
  getAllWorks,
  createWork,
  updateWork,
  deleteWork
};
