const db = require("../config/db");

async function createEvent({ title, date, location, description }) {
  const [result] = await db.query(
    "INSERT INTO events (title, date, location, description) VALUES (?,?,?,?)",
    [title, date, location, description || ""]
  );
  return result;
}

async function getEvents() {
  const [rows] = await db.query("SELECT * FROM events ORDER BY date ASC");
  return rows;
}

async function updateEvent(id, { title, date, location, description }) {
  const [result] = await db.query(
    "UPDATE events SET title=?, date=?, location=?, description=? WHERE id=?",
    [title, date, location, description || "", id]
  );
  return result;
}

async function deleteEvent(id) {
  const [result] = await db.query("DELETE FROM events WHERE id=?", [id]);
  return result;
}

module.exports = { createEvent, getEvents, deleteEvent };
