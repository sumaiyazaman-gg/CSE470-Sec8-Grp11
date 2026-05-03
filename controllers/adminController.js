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

function goToProfile(req, res) {
  const userId = req.params.id;
  res.redirect(`/profile/${userId}`);
}

module.exports = { listUsers, stats, goToProfile };
