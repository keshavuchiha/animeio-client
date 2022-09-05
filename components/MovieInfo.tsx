import React from 'react'
import {Image} from '@mantine/core'
import { Genres, MovieDetails } from '../typings';
import { baseUrl } from '../constants/constants';
interface Props{
    movie?:MovieDetails
}
function MovieInfo(props:Props) {
    const {movie}=props;
  return (
    <>
        <div>
              <Image
                height="100%"
                width="100%"
                src={`${baseUrl}${movie?.poster_path || movie?.backdrop_path}`}
                alt={movie?.title}
                radius="lg"
              />
            </div>
            Rating: {movie?.vote_average}
            <br />
            Status: {movie?.status}
            <br />
            Release Date: {movie?.release_date}
            <br />
            Popularity: {movie?.popularity}
            <br />
            Duration: {movie?.runtime} min
            <br />
            Produced By:
            <ol>
              {movie?.production_companies.map(({ id , name }: Genres) => {
                return <li key={id}>{name}</li>;
              })}
            </ol>
    </>
  )
}

export default MovieInfo