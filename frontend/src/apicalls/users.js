
import { BASEURL } from "./bookings";
const { axiosInstance } = require("./axiosinstance");
// Regsiter a new User

export const RegisterUser = async (payload)=>{
    try {
        const response = await axiosInstance.post(`https://${BASEURL}/api/users/register`, payload)
        return response
    } catch (error) {
        return error
    }
}


export const LoginUser = async (payload)=>{
    try {
        const response = await axiosInstance.post(`https://${BASEURL}/api/users/login`, payload)
        return response
    } catch (error) {
        return error
    }
}

//get Current User
export const GetCurrentUser = async (payload) => {
 try {
    const response = await axiosInstance.get(`https://${BASEURL}/api/users/get-current-user`,payload)
    return response.data;
 } catch (error) {
    
 }
}
