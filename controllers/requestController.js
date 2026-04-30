const {
  createRequest,
  getRequestsByUser,
  getAllRequests,
  updateRequestStatus,
} = require("../models/requestModel");

async function submitRequest(req, res) {
  const { title, description, category } = req.body;
  const image = req.file ? req.file.filename : null;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });

  try {
    await createRequest({
      userId: req.user.id,
      title,
      description,
      category: category || "General",
      image,
    });
    res.json({ message: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Could not submit request" });
  }
}

async function getMyRequests(req, res) {
  try {
    const requests = await getRequestsByUser(req.user.id);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function getAllRequestsForAdmin(req, res) {
  try {
    const requests = await getAllRequests({
      status: req.query.status || null,
      search: req.query.search || null,
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

async function updateRequest(req, res) {
  const { status, admin_note } = req.body;
  try {
    await updateRequestStatus(req.params.id, status, admin_note);
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { submitRequest, getMyRequests, getAllRequestsForAdmin, updateRequest };
