const db = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
  return rows;
}

async function createUser({ email, name, password, role }) {
  const [result] = await db.query(
    "INSERT INTO users (email, name, password, role) VALUES (?,?,?,?)",
    [email, name, password, role]
  );
  return result;
}

async function getAllUsers() {
  const [rows] = await db.query("SELECT id, name, email, role FROM users ORDER BY id DESC");
  return rows;
}
function goToProfile() {
    const role = localStorage.getItem("role");

    if (role === "admin") {
        window.location.href = "admin.html"; 
    } else {
        window.location.href = "profile.html";
    }
}
module.exports = { findUserByEmail, createUser, getAllUsers, goToProfile };
