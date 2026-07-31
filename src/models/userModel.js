import pool from "../config/db.js";

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

export const insertUser = async (name, email) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
  );
  return { id: result.insertId, name, email };
};

export const findAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email, created_at, updated_at FROM users ORDER BY id DESC",
  );
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
    [id],
  );
  return rows[0] || null;
};

export const updateUserById = async (id, name, email) => {
  const [result] = await pool.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
  );

  if (result.affectedRows === 0) return null;

  return await findUserById(id);
};

export const deleteUserById = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
