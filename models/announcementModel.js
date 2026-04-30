const db = require("../config/db");

async function createAnnouncement({ title, message, priority }) {
  const [result] = await db.query(
    "INSERT INTO announcements (title, message, priority, created_at) VALUES (?,?,?, NOW())",
    [title, message, priority || "normal"]
  );
  return result;
}

async function getAnnouncements(filter = {}) {
  const conditions = ["1=1"];
  const params = [];

  if (filter.priority) {
    conditions.push("priority = ?");
    params.push(filter.priority);
  }

  if (filter.search) {
    conditions.push("(title LIKE ? OR message LIKE ?)");
    const term = `%${filter.search}%`;
    params.push(term, term);
  }

  const [rows] = await db.query(
    `SELECT * FROM announcements WHERE ${conditions.join(" AND ")} ORDER BY created_at DESC LIMIT 50`,
    params
  );
  return rows;
}

async function deleteAnnouncement(id) {
  const [result] = await db.query("DELETE FROM announcements WHERE id=?", [id]);
  return result;
}

module.exports = { createAnnouncement, getAnnouncements, deleteAnnouncement };
