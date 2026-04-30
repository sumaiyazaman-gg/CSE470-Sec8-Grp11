const router = require("express").Router();
const { adminMiddleware } = require("../middleware/auth");
const { listUsers, stats } = require("../controllers/adminController");

router.get("/stats", adminMiddleware, stats);
router.get("/users", adminMiddleware, listUsers);

module.exports = router;
