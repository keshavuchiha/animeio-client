import { tmdbApiKey } from "../constants/constants"

export const fetchMovies=async ()=>{
    const response=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`);
    const data=await response.json();
    return data;
}