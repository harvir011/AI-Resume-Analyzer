const express = require("express");
const multer = require("multer");
const path = require("path");

const { uploadResume, getResumeHistory } = require("../controllers/resumeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), "uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/history", protect, getResumeHistory);

module.exports = router;
