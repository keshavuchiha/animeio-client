import { Carousel } from "@mantine/carousel";
import React from "react";
import { MovieDetails, UrlParams } from "../typings";
import MovieCard from "./MovieCard";
import {useQuery} from '@tanstack/react-query';
import {Movies} from '../typings';
import { fetchApiData } from "../utils/fetchMovies";
import { fetchData } from "next-auth/client/_utils";
interface Props {
  url:string
  urlParams?:UrlParams
}
function MoviesSlider(props: Props) {
  const {url,urlParams}=props;
  const { data: movies, isLoading } = useQuery<Movies>(
    [url,urlParams],
    async () => fetchApiData(url)
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <Carousel loop withControls slideSize='20%' slideGap='md'>
      {movies?.results?.map((movie,index)=>{ 
        const title=movie.title || movie.original_title;
        return (
            <Carousel.Slide key={title}><MovieCard movie={movie}/></Carousel.Slide>
        )
      })}
    </Carousel>
  );
}

export default MoviesSlider;
