const db = require("../config/db");

async function upsertFeedback({ userId, requestId, rating, comment }) {
  const [result] = await db.query(
    "INSERT INTO feedback (user_id, request_id, rating, comment) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE rating=VALUES(rating), comment=VALUES(comment)",
    [userId, requestId, rating, comment || ""]
  );
  return result;
}

async function getAllFeedback() {
  const [rows] = await db.query(
    "SELECT f.*, u.name as student_name, r.title as request_title FROM feedback f JOIN users u ON f.user_id=u.id JOIN requests r ON f.request_id=r.id ORDER BY f.id DESC"
  );
  return rows;
}

module.exports = { upsertFeedback, getAllFeedback };
