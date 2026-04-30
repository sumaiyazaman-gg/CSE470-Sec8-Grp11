const jwt = require("jsonwebtoken");
const JWT_SECRET = "scp_campus_secret_2024_change_in_production";

function getToken(req) {
  const header = req.headers.authorization;
  return header?.split(" ")[1] || null;
}

function authMiddleware(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Admin access required" });
    next();
  });
}

module.exports = { authMiddleware, adminMiddleware, JWT_SECRET };
