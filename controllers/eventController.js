const { createEvent, getEvents, deleteEvent } = require("../models/eventModel");

async function addEvent(req, res) {
  const { title, date, location, description } = req.body;
  if (!title || !date || !location)
    return res.status(400).json({ error: "Title, date and location required" });

  try {
    await createEvent({ title, date, location, description });
    res.json({ message: "Event created" });
  } catch (err) {
    res.status(500).json({ error: "Could not create event" });
  }
}

async function listEvents(req, res) {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function updateEvent(req, res) {
  const { title, date, location, description } = req.body;
  if (!title || !date || !location)
    return res.status(400).json({ error: "Title, date and location required" });

  try {
    await updateEvent(req.params.id, { title, date, location, description });
    res.json({ message: "Event updated" });
  } catch (err) {
    res.status(500).json({ error: "Could not update event" });
  }
}

async function removeEvent(req, res) {
  try {
    await deleteEvent(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { addEvent, listEvents, updateEvent, removeEvent };
