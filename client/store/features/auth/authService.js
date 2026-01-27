import axiosService from "../../../lib/axiosService"

const login = async (data) => {
    const respone = await axiosService.post(`/api/auth/login` , data)
    return respone.data
}


const verifySession = async ()=>{
    const respone = await axiosService.get(`/api/auth/verify-session`)
    return respone.data
}




const logout = async ()=>{
    const respone = await axiosService.post(`/api/auth/logout` , {},
    { withCredentials: true }) 
    return respone.data
}


const authService = { login , logout , verifySession}

export default authService