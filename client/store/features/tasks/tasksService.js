import axiosService from "../../../lib/axiosService"

const addTask = async (task)=>{
    const respone = await axiosService.post('/api/tasks/add' , {task} )
    return respone.data
}


const getAll = async ()=>{
    const respone = await axiosService.get("/api/tasks")
    return respone.data
}

const changeStatus = async (task)=>{
    const respone = await axiosService.post("/api/tasks/changeStatus" , task)
    return respone.data
}


const deleteByid = async (id)=>{
    const respone = await axiosService.delete('/api/tasks/delete' , {data : {id}})
    return respone.data
}

const tasksService  = { addTask , getAll , changeStatus , deleteByid}
export default tasksService