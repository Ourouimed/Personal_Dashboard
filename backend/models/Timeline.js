import mongoose from "mongoose";
const TimelineShema = new mongoose.Schema({
        title: {type : String , required : true},
        org: {type : String , required : true} ,
        type : {type : String , required : true , enum : ['work' , 'education'] , default : 'education'} ,
        date: {type : String , required : true} ,
        desc: {type : String , required : true},
        location: {type : String , required : true},
      },)

const Timeline = mongoose.model('TimeLine' , TimelineShema)
export default Timeline