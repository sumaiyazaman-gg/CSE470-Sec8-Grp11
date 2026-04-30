const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const { addAnnouncement, listAnnouncements, removeAnnouncement } = require("../controllers/announcementController");

router.post("/announcement", adminMiddleware, addAnnouncement);
router.get("/announcements", authMiddleware, listAnnouncements);
router.delete("/announcement/:id", adminMiddleware, removeAnnouncement);

module.exports = router;
