import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [{ type: String }],
  link: { type: String },
  github: { type: String },
  image: { type: String },
  category: { type: String },
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;