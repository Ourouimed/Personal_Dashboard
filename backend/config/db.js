import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NODE_ENV =='production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/personalDash');
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;