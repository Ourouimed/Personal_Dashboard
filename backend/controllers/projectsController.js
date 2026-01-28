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
        console.log(err) 
        res.status(500).json({error : 'Internal server error'})
    }
}

const getAllProjects = async (req , res)=>{
    try {
        const projects = await Project.find({})
        res.json({message : 'Projects fetched successsfully' , projects})
    }

     catch (err){
      console.log(err) 
      res.status(500).json({error : 'Internal server error'})

    }
    
}

const deleteProject = async (req , res)=>{
  try {
    const { id } = req.body
    if (!id){
      return res.status(400).json({error : 'id is required'})
    }


    await Project.findByIdAndDelete(id) 
    return res.json({message : 'Project delete successfully'})
  }

  catch (err){
    console.log(err) 
    res.status(500).json({error : 'Internal server error'})

  }
}

const updateProject = async (req , res)=>{
    try {
        const { title , category , description , link , github , tech} = req.body
        const { id } = req.params
    
      if (!title || !category || !description|| tech.length === 0){
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (req.file){
        const projectImage = await uploadImage(req.file , "projects")
        await Project.findByIdAndUpdate(id , {
          image : projectImage
        })
      }
      


      const project = await Project.findByIdAndUpdate(id , {
        title , category , description , tech , link : link || '' , github : github || '' 
      })


      console.log(project)
      res.json({message : 'Project updated successfully' , project : project})
    }

     catch (err){
        console.log(err) 
        res.status(500).json({error : 'Internal server error'})
    }

}

export { addProject , getAllProjects , deleteProject , updateProject}