import { uploadImage } from "../lib/upload-image.js";
import Project from "../models/Projects.js";

const addProject = async (req , res)=>{
    try {
        const { title , category , description , link , github , tech} = req.body
    
      if (!title || !category || !description|| tech.length === 0 || !req.file){
        return res.status(400).json({ error: "Missing required fields" });
      }

      const projectImage = await uploadImage(req.file , "projects")


      const project = await Project.create({
        image : projectImage ,
        title , category , description , tech , link : link || '' , github : github || '' 
      })
      res.json({message : 'Project added successfully' , project : project})
    }

    catch (err){

    }
}

const getAllProjects = async (req , res)=>{
    const projects = await Project.find({})
    res.json({message : 'Projects fetched successsfully' , projects})
}


export { addProject , getAllProjects}