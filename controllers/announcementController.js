const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require("../models/announcementModel");

async function addAnnouncement(req, res) {
  const { title, message, priority } = req.body;
  if (!title || !message)
    return res.status(400).json({ error: "Title and message required" });

  try {
    await createAnnouncement({ title, message, priority });
    res.json({ message: "Announcement posted" });
  } catch (err) {
    res.status(500).json({ error: "Could not post announcement" });
  }
}

async function listAnnouncements(req, res) {
  try {
    const announcements = await getAnnouncements({
      priority: req.query.priority || null,
      search: req.query.q || null,
    });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function removeAnnouncement(req, res) {
  try {
    await deleteAnnouncement(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { addAnnouncement, listAnnouncements, removeAnnouncement };
