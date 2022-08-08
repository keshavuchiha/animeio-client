import React from 'react'
import { MovieDetails, Movies } from '../typings'
import {Carousel} from '@mantine/carousel'
import Banner from './Banner'

interface Props{
    movies?:MovieDetails[]
}

function BannerCarousel(props:Props) {
    const {movies}=props;
    const length=movies?.length as number;
  return (
    <Carousel withControls loop withIndicators>
        <Carousel.Slide><Banner movie={movies?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
        <Carousel.Slide><Banner movie={movies?.[Math.floor(Math.random()*length)]}/></Carousel.Slide>
    </Carousel>
  )
}

export default BannerCarousel