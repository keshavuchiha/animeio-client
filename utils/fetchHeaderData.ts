import { tmdbApiKey } from './../constants/constants';

export const fetchMovieGenres=async ()=>{
    const response=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}&language=en-US`)
    const data=await response.json();
    return data;
}
export const fetchTvGenres=async ()=>{
    const response=await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbApiKey}&language=en-US`)
    const data=await response.json();
    return data;
}