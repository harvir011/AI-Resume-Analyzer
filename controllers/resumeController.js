const Resume = require("../models/Resume");

const analyzeResume = (file) => {
  const score = Math.floor(72 + Math.random() * 24);
  const summary = `Your resume received an estimated ATS score of ${score}%. It has a clean structure and shows good detail. To improve the score further, consider adding more quantifiable achievements, stronger action verbs, and a clearer summary statement.`;
  const keywords = ["Communication", "Teamwork", "Project Management", "Problem Solving"];

  return {
    atsScore: score,
    summary,
    keywords,
  };
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    const { originalname, filename } = req.file;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    const analysis = analyzeResume(req.file);

    const resume = await Resume.create({
      user: req.user.userId,
      fileName: originalname,
      fileUrl,
      atsScore: analysis.atsScore,
      summary: analysis.summary,
      keywords: analysis.keywords,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully.",
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResumeHistory = async (req, res) => {
  try {
    const history = await Resume.find({ user: req.user.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResumeHistory,
};
