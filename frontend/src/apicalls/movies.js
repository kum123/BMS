import { BASEURL } from "./bookings";
const {axiosInstance } = require("./axiosinstance");


export const addMovie = async (payload)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/movies/add-movie`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const getAllMovies = async (payload) => {
    try {
        const response = await axiosInstance.get(`${BASEURL}/api/movies/movie-list`,payload);
        return response;
    } catch (error) {
        return error;
    }
   
}

export const getMovieById = async (movieId) => {
    try {
        const response = await axiosInstance.get(`${BASEURL}/api/movies/get-by-id/${movieId}`);
        return response;
    } catch (error) {
        return error;
    }
   
}
export const updateMovie = async (payload)=>{
    try {
        const response = await axiosInstance.put(`${BASEURL}/api/movies/update-movie`,payload)
        return response
    } catch (error) {
        return error
    }
}
export const DeleteMovie = async (movieId)=>{
    try {
        const response = await axiosInstance.post(`${BASEURL}/api/movies/delete-movie/${movieId}`)
        return response;
    } catch (error) {
        return error
    }
}

