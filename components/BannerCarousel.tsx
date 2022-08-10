import React from 'react'
import { MovieDetails, Movies } from '../typings'
import {Carousel} from '@mantine/carousel'
import Banner from './Banner'
import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../utils/fetchMovies'

interface Props{
    movies?:MovieDetails[]
}

function BannerCarousel(props:Props) {
    const { data: movies, isLoading } = useQuery<Movies>(
      ["/movies/popular"],
      () => fetchMovies()
    );
    if (isLoading) {
      return <>Loading...</>;
    }
    const length=movies?.results?.length as number;
  return (
    <Carousel withControls loop withIndicators>
        <Carousel.Slide><Banner movie={movies?.results?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.results?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.results?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.results?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.results?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
    </Carousel>
  )
}

export default BannerCarousel