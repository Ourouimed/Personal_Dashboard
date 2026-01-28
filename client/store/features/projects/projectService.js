import axiosService from "../../../lib/axiosService"

const addProject = async (data)=>{
    const respone = await axiosService.post('/api/projects/add' , data , {
        headers: { "Content-Type": "multipart/form-data" },
      })
    return respone.data
}

const updateProject = async (id , data)=>{
    const respone = await axiosService.put(`/api/projects/update/${id}` , data , {
        headers: { "Content-Type": "multipart/form-data" },
      })
    return respone.data
}
const getAll = async ()=>{
    const respone = await axiosService.get("/api/projects")
    return respone.data
}

const deleteByid = async (id)=>{
    const respone = await axiosService.delete('/api/projects/delete' , {data : {id}})
    return respone.data
}

const projectService =  { addProject , getAll , deleteByid , updateProject}
export default projectService