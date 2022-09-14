import { serverUrl } from './../constants/constants';

export const fetchUserByEmail=async (email:string)=>{
    const response=await fetch(`${serverUrl}/user`,{
        body:JSON.stringify({"email":email})
    });
    const data=await response.json();
    return data;
}