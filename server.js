const fs = require("fs");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static("."));

app.use(authRoutes);
app.use(requestRoutes);
app.use(feedbackRoutes);
app.use(bookingRoutes);
app.use(announcementRoutes);
app.use(eventRoutes);
app.use(adminRoutes);

app.listen(3000, () => console.log("✅ SCP Server running on http://localhost:3000"));
