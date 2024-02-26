
import { BASEURL } from "./bookings";
const { axiosInstance } = require("./axiosinstance");
// Regsiter a new User

export const RegisterUser = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/users/register`, payload)
        return response
    } catch (error) {
        return error
    }
}


export const LoginUser = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/users/login`, payload)
        return response
    } catch (error) {
        return error
    }
}

//get Current User
export const GetCurrentUser = async (payload) => {
 try {
    const response = await axiosInstance.get(`${BASEURL}/api/users/get-current-user`,payload)
    return response.data;
 } catch (error) {
    
 }
}

// Usage of URL params
// export const MockParm = async(id) => {
//     const response = await axiosInstance.post(`${BASEURL}/api/movies?movieId=${id}`, payload)
// }

