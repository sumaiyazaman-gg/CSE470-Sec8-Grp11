const { getStats } = require("../models/adminModel");
const { getAllUsers } = require("../models/userModel");

async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function stats(req, res) {
  try {
    const results = await getStats();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { listUsers, stats };
