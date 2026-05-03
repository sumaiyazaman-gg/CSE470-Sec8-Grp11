const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const { addEvent, listEvents, removeEvent, updateEvent } = require("../controllers/eventController");

router.post("/event", adminMiddleware, addEvent);
router.get("/events", authMiddleware, listEvents);
router.put("/event/:id", adminMiddleware, updateEvent);
router.delete("/event/:id", adminMiddleware, removeEvent);

module.exports = router;
