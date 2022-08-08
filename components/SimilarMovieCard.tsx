import { Grid, Group, Image, Text } from "@mantine/core";
import React from "react";
import { baseUrl } from "../constants/constants";
import { MovieDetails } from "../typings";
import styles from "../styles/SimilarMovieCard.module.css";
import Link from "next/link";
interface Props {
  movie?: MovieDetails;
  key: number;
}
function SimilarMovieCard(props: Props) {
  const { movie } = props;
  return (
    <Link href={`/movies/${movie?.id}`}>
      <a>
        <Grid className={styles.similarMovieCard}>
          <Grid.Col span={2}>
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              alt={movie?.title}
              height="15vh"
            />
          </Grid.Col>
          <Grid.Col span={10}>
            <Group sx={{ justifyContent: "space-between" }}>
              <Text color="cyan">{movie?.title}</Text>
              <Text>{parseFloat(`${movie?.vote_average}`).toFixed(1)}</Text>
            </Group>
            <Text className={styles.movieCardText}>{movie?.overview}</Text>
          </Grid.Col>
        </Grid>
      </a>
    </Link>
  );
}

export default SimilarMovieCard;
