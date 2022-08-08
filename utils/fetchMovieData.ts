import { QueryFunctionContext } from "@tanstack/react-query";
import { tmdbApiKey } from "./../constants/constants";

export const fetchMovieById = async (id: number) => {
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`;
  //   console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchSimilarMovies = async (id:number,pageParam:QueryFunctionContext) => {
    // console.log(pageParam,'pageparams');
  let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${tmdbApiKey}&language=en-US&page=${pageParam}`;
  //   console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchTrailers=async (id:number)=>{
    const response=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${tmdbApiKey}&language=en-US`);
    const data=await response.json();
    return data;
}