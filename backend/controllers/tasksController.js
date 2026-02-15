import Tasks from "../models/Tasks.js";

const addTask = async (req , res)=>{
    try {
        const { task } = req.body
    
      if (!task){
        return res.status(400).json({ error: "Missing required fields" });
      }


      const taskItem = await Tasks.create({title : task})
      res.json({message : 'Task added successfully' , task : taskItem})
    }

     catch (err){
        console.log(err) 
        res.status(500).json({error : 'Internal server error'})
    }
}


const getAllTasks = async (req , res)=>{
    try {
        const tasks = await Tasks.find({})
        res.json({message : 'tasks fetched successsfully' , tasks})
    }

     catch (err){
      console.log(err) 
      res.status(500).json({error : 'Internal server error'})

    }
    
}


const changeStatus = async (req , res)=>{

    try {
        const { _id , status} = req.body
        const task = await Tasks.findByIdAndUpdate(_id , {status} , { new: true })
        res.json({message : 'tasks status changed successsfully' , task})
    }

    catch (err){
      console.log(err) 
      res.status(500).json({error : 'Internal server error'})

    }
   
}


const deleteTask = async (req , res)=>{
  try {
    const { id } = req.body
    if (!id){
      return res.status(400).json({error : 'id is required'})
    }


    await Tasks.findByIdAndDelete(id) 
    return res.json({message : 'Task delete successfully'})
  }

  catch (err){
    console.log(err) 
    res.status(500).json({error : 'Internal server error'})

  }
}
export { addTask , getAllTasks , changeStatus , deleteTask}