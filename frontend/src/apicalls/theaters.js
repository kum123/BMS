import {axiosInstance} from './axiosinstance';
import {BASEURL }from  './bookings';


export const getTheatersByUserId = async (payload) =>{
    try {
        const response = await axiosInstance.get(`${BASEURL}/api/theaters/get-all-theaters-by-userid`,payload);
        return response;
    } catch (error) {
        return error;
    }
           
}

export const GetAllTheaters = async (payload) =>{
    try {
        const response = await axiosInstance.get(`${BASEURL}/api/theaters/get-all-theaters`,payload);
        return response;
    } catch (error) {
        return error;
    }
           
}
export const GetAllTheatersForMovie = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/theaters/get-theaters-for-movie`, payload)
        return response;
    } catch (error) {
        return error
    }
}

export const AddTheater = async (payload) =>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/theaters/add-theater`,payload);
        return response;
    } catch (error) {
        return error;
    }
   

}

export const UpdateTheater = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/theaters/update-theater`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const DeleteTheater = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/theatres/delete-theater`, payload)
        return response
    } catch (error) {
        return error
    }
}

