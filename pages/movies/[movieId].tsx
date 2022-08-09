import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Grid, Group, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import { fetchMovieById } from "../../utils/fetchMovieData";
import { Genres, MovieDetails } from "../../typings";
import MovieInfo from "../../components/MovieInfo";
import MovieTabs from "../../components/MovieTabs";

interface Props {
  id: {
    movieId: string;
  };
}

function Movie(props: Props) {

  const id = parseInt(props.id.movieId as string);
  const { data: movie } = useQuery<MovieDetails>(["api/movie"], async () =>
    fetchMovieById(id)
  );

  if (!movie) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Layout>
        <Grid
          sx={{
            marginLeft: "5vw",
            marginRight: "5vw",
            marginTop: "0.5rem",
          }}
        >
          <Grid.Col span={4}>
            <MovieInfo movie={movie} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Text sx={{ fontSize: "3rem", paddingTop: "5rem" }}>
              {movie?.original_title}
            </Text>
            <Group>
              <span>Genres </span>
              {movie?.genres.map(({ id, name }: Genres) => {
                return <span key={id}>{name}</span>;
              })}
            </Group>
            <MovieTabs movie={movie} id={id} />
            <br />
          </Grid.Col>
        </Grid>
      </Layout>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  // console.log(context.params);
  return {
    props: { id: context.params },
  };
};
export default Movie;
