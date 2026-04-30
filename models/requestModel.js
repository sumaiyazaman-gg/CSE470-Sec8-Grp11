const db = require("../config/db");

async function createRequest({ userId, title, description, category, image }) {
  const [result] = await db.query(
    "INSERT INTO requests (user_id, title, description, category, image, status) VALUES (?,?,?,?,?,?)",
    [userId, title, description, category, image, "Pending"]
  );
  return result;
}

async function getRequestsByUser(userId) {
  const [rows] = await db.query(
    "SELECT r.*, u.name as student_name FROM requests r JOIN users u ON r.user_id=u.id WHERE r.user_id=? ORDER BY r.id DESC",
    [userId]
  );
  return rows;
}

async function getAllRequests(filter = {}) {
  const conditions = ["1=1"];
  const params = [];

  if (filter.status) {
    conditions.push("r.status = ?");
    params.push(filter.status);
  }

  if (filter.search) {
    conditions.push("(r.title LIKE ? OR r.description LIKE ? OR u.name LIKE ? OR u.email LIKE ?)");
    const term = `%${filter.search}%`;
    params.push(term, term, term, term);
  }

  const [rows] = await db.query(
    `SELECT r.*, u.name as student_name, u.email as student_email FROM requests r JOIN users u ON r.user_id=u.id WHERE ${conditions.join(" AND ")} ORDER BY r.id DESC`,
    params
  );
  return rows;
}

async function updateRequestStatus(id, status, admin_note) {
  const [result] = await db.query(
    "UPDATE requests SET status=?, admin_note=? WHERE id=?",
    [status, admin_note || null, id]
  );
  return result;
}

module.exports = { createRequest, getRequestsByUser, getAllRequests, updateRequestStatus };
