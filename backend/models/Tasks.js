import mongoose from "mongoose";

const TaskShema = new mongoose.Schema({
    title : { type : String , required : true} ,  
    status : { type : String , required : true , default : 'active'}
})

const Tasks = mongoose.model('Tasks' , TaskShema)
export default Tasks