import { Carousel } from "@mantine/carousel";
import React from "react";
import { MovieDetails } from "../typings";
import MovieCard from "./MovieCard";
interface Props {
  movies?: MovieDetails[];
}
function MoviesSlider(props: Props) {
  const { movies } = props;
  return (
    <Carousel loop withControls slideSize='20%' slideGap='md'>
      {movies?.map((movie,index)=>{
        const title=movie.title || movie.original_title;
        return (
            <Carousel.Slide key={title}><MovieCard movie={movie}/></Carousel.Slide>
        )
      })}
    </Carousel>
  );
}

export default MoviesSlider;
