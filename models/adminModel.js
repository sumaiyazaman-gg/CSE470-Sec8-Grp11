const db = require("../config/db");

async function getStats() {
  const queries = {
    total_requests: "SELECT COUNT(*) as c FROM requests",
    pending: "SELECT COUNT(*) as c FROM requests WHERE status='Pending'",
    completed: "SELECT COUNT(*) as c FROM requests WHERE status='Completed'",
    total_users: "SELECT COUNT(*) as c FROM users WHERE role='student'",
    total_bookings: "SELECT COUNT(*) as c FROM bookings",
    avg_rating: "SELECT ROUND(AVG(rating),1) as c FROM feedback",
  };

  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, sql]) => {
      try {
        const [rows] = await db.query(sql);
        return [key, rows[0]?.c || 0];
      } catch {
        return [key, 0];
      }
    })
  );

  return Object.fromEntries(entries);
}

module.exports = { getStats };
