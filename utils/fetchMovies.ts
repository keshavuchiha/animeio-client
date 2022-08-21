import { UrlParams } from './../typings.d';
import { tmdbApiKey } from "../constants/constants"

export const fetchMovies=async ()=>{
    const response=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`);
    const data=await response.json();
    return data;
}

export const fetchApiData=async (url:string,urlParams?:UrlParams)=>{
    let finalUrl=url;
    urlParams?.options.map((option)=>{
        finalUrl.concat(`&${option.option}=${option.value}`)
    });
    // console.log('url',url);
    const response=await fetch(finalUrl);
    const data=await response.json();
    return data;
}