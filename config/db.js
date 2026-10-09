const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-resume-analyzer";

  try {
    console.log(`Connecting to MongoDB: ${dbURI}`);
    await mongoose.connect(dbURI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;