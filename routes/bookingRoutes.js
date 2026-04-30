const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const {
  createNewBooking,
  getMyBookings,
  getAllBookingsForAdmin,
  cancelMyBooking,
} = require("../controllers/bookingController");

router.post("/booking", authMiddleware, createNewBooking);
router.get("/bookings/my", authMiddleware, getMyBookings);
router.get("/bookings", adminMiddleware, getAllBookingsForAdmin);
router.put("/booking/:id/cancel", authMiddleware, cancelMyBooking);
router.put("/booking/:id", authMiddleware, updateBooking);

module.exports = router;
