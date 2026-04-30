const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");
const { findUserByEmail, createUser } = require("../models/userModel");

function validateEmail(email) {
  return email?.endsWith("@university.edu.bd");
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  if (!validateEmail(email))
    return res.status(400).json({ error: "Must use university email (@university.edu.bd)" });

  try {
    const users = await findUserByEmail(email);
    if (users.length === 0)
      return res.status(401).json({ error: "Account not found. Please register." });

    const user = users[0];
    if (user.password !== password)
      return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function register(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ error: "All fields required" });
  if (!validateEmail(email))
    return res.status(400).json({ error: "Must use university email" });
  if (password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters" });

  try {
    const existingUsers = await findUserByEmail(email);
    if (existingUsers.length > 0)
      return res.status(409).json({ error: "Account already exists. Please login." });

    const result = await createUser({ email, name, password, role: "student" });
    const token = jwt.sign(
      { id: result.insertId, email, name, role: "student" },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token, user: { id: result.insertId, name, role: "student", email } });
  } catch (err) {
    res.status(500).json({ error: "Could not create account" });
  }
}

module.exports = { login, register };
