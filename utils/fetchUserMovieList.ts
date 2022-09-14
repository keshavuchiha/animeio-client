import { serverUrl } from './../constants/constants';

export const fetchUserMovieList=async (email:string,type:string)=>{
    const response=await fetch(`/api/auth/user`);
    const data=await response.json();
    return data;
}