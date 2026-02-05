import Timeline from "../models/Timeline.js"

const getTimeLine  = async (req , res)=>{
    try {
        const timeline = await Timeline.find({})
        res.json({message : 'Timeline fetched successsfully' , timeline})
    }

     catch (err){
      console.log(err) 
      res.status(500).json({error : 'Internal server error'})

    }
    
}


const addJourney = async (req , res)=>{
    try {
        console.log(req.body)
        const { title , org , desc , type , date , location} = req.body
    
      if (!title || !org || !desc|| !type || !date || !location){
        return res.status(400).json({ error: "Missing required fields" });
      }


      const timeline = await Timeline.create({
        title , org , desc , type , date , location
      })
      res.json({message : 'Journey added successfully' , timeline})
    }

     catch (err){
        console.log(err) 
        res.status(500).json({error : 'Internal server error'})
    }
}


const updateJourney = async (req , res)=>{
    try {
        const { title , org , desc , type , date , location} = req.body
        const { id } = req.params
    
      if (!title || !org || !desc|| !type || !date || !location){
        return res.status(400).json({ error: "Missing required fields" });
      }


      const timeline = await Timeline.findByIdAndUpdate(id,{
        title , org , desc , type , date , location
      })
      res.json({message : 'Journey updated successfully' , timeline})
    }

     catch (err){
        console.log(err) 
        res.status(500).json({error : 'Internal server error'})
    }
}


const deleteJourney = async (req , res)=>{
  try {
    const { id } = req.body
    if (!id){
      return res.status(400).json({error : 'id is required'})
    }


    await Timeline.findByIdAndDelete(id) 
    return res.json({message : 'Journey deleted successfully'})
  }

  catch (err){
    res.status(500).json({error : 'Internal server error'})

  }
}
export  {getTimeLine , addJourney , deleteJourney , updateJourney}