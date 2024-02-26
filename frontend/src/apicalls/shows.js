import { axiosInstance } from "./axiosinstance";
import { BASEURL } from "./bookings";
export const GetShowsByTheaterId = async(theaterId) =>{
                try {
                        const response = await axiosInstance.get(`https://${BASEURL}/api/shows/get-shows-by-theater-id/${theaterId}`);
                        return response;
                } catch (error) {
                        return error;
                }
}
export const getShowById = async(showId)=>{
            try {
                const response = await axiosInstance.get(`https://${BASEURL}/api/shows/get-show-by-id/${showId}`);
                return response;
            } catch (error) {
                return error;
            }
}

export const AddShow = async(payload) =>{
                try {
                        const response = await axiosInstance.post(`https://${BASEURL}/api/shows/add-show`,payload);
                        return response;
                } catch (error) {
                            return error;
                }
}
export const DeleteShow = async(payload) =>{
    try {
            const response = await axiosInstance.post(`https://${BASEURL}/api/shows/delete-show`,payload);
            return response;
    } catch (error) {
                return error;
    }
}