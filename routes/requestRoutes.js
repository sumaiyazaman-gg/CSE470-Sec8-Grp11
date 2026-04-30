const router = require("express").Router();
const multer = require("multer");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const {
  submitRequest,
  getMyRequests,
  getAllRequestsForAdmin,
  updateRequest,
} = require("../controllers/requestController");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/request", authMiddleware, upload.single("image"), submitRequest);
router.get("/requests/my", authMiddleware, getMyRequests);
router.get("/requests", adminMiddleware, getAllRequestsForAdmin);
router.put("/request/:id", adminMiddleware, updateRequest);

module.exports = router;
