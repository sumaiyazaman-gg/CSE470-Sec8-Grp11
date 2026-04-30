const { upsertFeedback, getAllFeedback } = require("../models/feedbackModel");

async function submitFeedback(req, res) {
  const { request_id, rating, comment } = req.body;
  if (!request_id || !rating)
    return res.status(400).json({ error: "Request ID and rating required" });

  try {
    await upsertFeedback({
      userId: req.user.id,
      requestId: request_id,
      rating,
      comment,
    });
    res.json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ error: "Could not submit feedback" });
  }
}

async function getFeedback(req, res) {
  try {
    const feedbackList = await getAllFeedback();
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { submitFeedback, getFeedback };
