const {
  checkBookingExists,
  createBooking,
  getBookingsByUser,
  getAllBookings,
  updateBooking: updateBookingModel,
  cancelBooking,
} = require("../models/bookingModel");

async function createNewBooking(req, res) {
  const { facility, date, time_slot, purpose } = req.body;
  if (!facility || !date || !time_slot)
    return res.status(400).json({ error: "Facility, date and time slot required" });

  try {
    const exists = await checkBookingExists({ facility, date, time_slot });
    if (exists)
      return res.status(409).json({ error: "This slot is already booked" });

    await createBooking({
      userId: req.user.id,
      facility,
      date,
      time_slot,
      purpose,
    });
    res.json({ message: "Booking confirmed" });
  } catch (err) {
    res.status(500).json({ error: "Could not create booking" });
  }
}

async function getMyBookings(req, res) {
  try {
    const bookings = await getBookingsByUser(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function getAllBookingsForAdmin(req, res) {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function updateBooking(req, res) {
  const { facility, date, time_slot, purpose } = req.body;
  if (!facility || !date || !time_slot)
    return res.status(400).json({ error: "Facility, date and time slot required" });

  try {
    const exists = await checkBookingExists({ facility, date, time_slot, excludeId: req.params.id });
    if (exists)
      return res.status(409).json({ error: "This slot is already booked" });

    const result = await updateBookingModel(req.params.id, req.user.id, { facility, date, time_slot, purpose });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Booking not found" });

    res.json({ message: "Booking updated" });
  } catch (err) {
    res.status(500).json({ error: "Could not update booking" });
  }
}

async function cancelMyBooking(req, res) {
  try {
    const result = await cancelBooking(req.params.id, req.user.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { createNewBooking, getMyBookings, getAllBookingsForAdmin, updateBooking, cancelMyBooking };
