const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const { submitFeedback, getFeedback } = require("../controllers/feedbackController");

router.post("/feedback", authMiddleware, submitFeedback);
router.get("/feedback", adminMiddleware, getFeedback);

module.exports = router;
