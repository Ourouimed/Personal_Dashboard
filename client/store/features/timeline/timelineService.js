import axiosService from "../../../lib/axiosService"

const addJourney = async (data)=>{
    const respone = await axiosService.post('/api/timeline/add' , data )
    return respone.data
}


const getAll = async ()=>{
    const respone = await axiosService.get("/api/timeline")
    return respone.data
}

const deleteByid = async (id)=>{
    const respone = await axiosService.delete('/api/timeline/delete' , {data : {id}})
    return respone.data
}


const updateJourney = async (id , data)=>{
    const respone = await axiosService.put(`/api/timeline/update/${id}` , data)
    return respone.data
}

const timelineService =  { addJourney , getAll , deleteByid , updateJourney}
export default timelineService