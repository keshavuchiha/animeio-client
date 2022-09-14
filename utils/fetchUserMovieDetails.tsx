import { serverUrl } from "../constants/constants"

export const fetchUserMovieDetailsById=async (id:string)=>{
    const response=await fetch(`/api/auth/movies/${id}`);
    const data=await response.json();
    // console.log('data',data);
    return data;
}