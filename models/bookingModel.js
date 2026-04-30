const db = require("../config/db");

async function checkBookingExists({ facility, date, time_slot, excludeId = null }) {
  let sql = "SELECT id FROM bookings WHERE facility=? AND date=? AND time_slot=? AND status != 'Cancelled'";
  const params = [facility, date, time_slot];
  if (excludeId) {
    sql += " AND id != ?";
    params.push(excludeId);
  }
  const [rows] = await db.query(sql, params);
  return rows.length > 0;
}

async function createBooking({ userId, facility, date, time_slot, purpose }) {
  const [result] = await db.query(
    "INSERT INTO bookings (user_id, facility, date, time_slot, purpose, status) VALUES (?,?,?,?,?,?)",
    [userId, facility, date, time_slot, purpose || "", "Confirmed"]
  );
  return result;
}

async function getBookingsByUser(userId) {
  const [rows] = await db.query("SELECT * FROM bookings WHERE user_id=? ORDER BY date DESC", [userId]);
  return rows;
}

async function getAllBookings() {
  const [rows] = await db.query(
    "SELECT b.*, u.name as student_name FROM bookings b JOIN users u ON b.user_id=u.id ORDER BY b.date DESC"
  );
  return rows;
}

async function updateBooking(id, userId, { facility, date, time_slot, purpose }) {
  const [result] = await db.query(
    "UPDATE bookings SET facility=?, date=?, time_slot=?, purpose=? WHERE id=? AND user_id=? AND status != 'Cancelled'",
    [facility, date, time_slot, purpose || '', id, userId]
  );
  return result;
}

async function cancelBooking(id, userId) {
  const [result] = await db.query(
    "UPDATE bookings SET status='Cancelled' WHERE id=? AND user_id=?",
    [id, userId]
  );
  return result;
}

module.exports = { checkBookingExists, createBooking, getBookingsByUser, getAllBookings, cancelBooking };
