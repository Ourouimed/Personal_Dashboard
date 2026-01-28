import axiosService from "../../../lib/axiosService"

const addProject = async (data)=>{
    const respone = await axiosService.post('/api/projects/add' , data , {
        headers: { "Content-Type": "multipart/form-data" },
      })
    return respone.data
}

const getAll = async ()=>{
    const respone = await axiosService.get("/api/projects")
    return respone.data
}

const projectService =  { addProject , getAll}
export default projectService