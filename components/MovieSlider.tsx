import { Carousel } from "@mantine/carousel";
import React from "react";
import { MovieDetails } from "../typings";
import MovieCard from "./MovieCard";
import {useQuery} from '@tanstack/react-query';
import {Movies} from '../typings';
import { fetchMovies } from "../utils/fetchMovies";
interface Props {
  type:string
}
function MoviesSlider(props: Props) {
  const {type}=props;
  const { data: movies, isLoading } = useQuery<Movies>(
    ["/movies/popular",type],
    async () => fetchMovies()
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
