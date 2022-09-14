import { serverUrl } from './../constants/constants';

export const updateUserMovieType=async (movieId:string,type:string)=>{
    const response=await fetch(`/api/user/movies/change`,{
        method:"POST",
        body:JSON.stringify({movieId:movieId,type:type})
    });
    const data=await response.json();
    return data;
}