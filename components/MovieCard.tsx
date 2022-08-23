import React from "react";
import { Card, SimpleGrid, Image, HoverCard, ActionIcon } from "@mantine/core";
import StarsRating from "react-star-rate";
import Link from "next/link";
import { MovieDetails } from "../typings";
import styles from "../styles/MovieCard.module.css";
import { CirclePlus } from "tabler-icons-react";
import MovieOptions from "./MovieOptions";
interface Props {
  movie?: MovieDetails;
}
function MovieCard(props: Props) {
  const { movie } = props;
  const title = movie?.original_title;
  const imagePath = movie?.poster_path;
  return (
    <>
      <Link href={`/movies/${movie?.id}`}>
        <Card radius="lg">
          <Card.Section className={styles.movieCardImage}>
            <Image
              src={`http://image.tmdb.org/t/p/w500/${imagePath}`}
              alt={title}
              radius="lg"
            />
          </Card.Section>
          
          <div className={styles.movieCard}>
            {title}
            <HoverCard radius="md" position="bottom">
              <HoverCard.Target>
                <div>
                  <StarsRating value={(movie?.vote_average as number) / 2} />
                </div>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ backgroundColor: "gray" }}>
                {movie?.vote_average}
              </HoverCard.Dropdown>
            </HoverCard>
            {/* <MovieOptions /> */}
            <div>{movie?.overview}</div>
          </div>
        </Card>
      </Link>
    </>
  );
}

export default MovieCard;
