import { Button, SimpleGrid, Text } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MovieCard from "../../components/MovieCard";
import { Movies } from "../../typings";
import { fetchInfiniteMovies, fetchMoviesQueryData } from "../../utils/fetchMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
import { GetServerSideProps } from "next";
import { getCurrentlyPlaying, getPoplular, getTopRated, getUpcomming } from "../../constants/constants";
interface Props {
  url:string
}
function Movies(props: Props) {
  // console.log("props", props);
  const {url}=props;
  const [query, setQuery] = useState({});
  const { height, width } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();
  const {
    data: movies,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery<Movies>(
    [url, query],
    async ({ pageParam = 1 }) => fetchMoviesQueryData(url,pageParam),
    {
      getNextPageParam: (lastpage) => {
        return lastpage.page + 1;
      },
    }
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  if (scroll.y >= height / 2) {
    fetchNextPage();
  }
  return (
    <div>
      <Layout>
        <SimpleGrid cols={6} sx={{ marginLeft: "2rem", marginRight: "2rem" }}>
          {movies?.pages.map((movies, index) => {
            return (
              <React.Fragment key={index}>
                {movies?.results.map((movie, index) => {
                  return (
                    <div key={movie.id as string}>
                      <MovieCard movie={movie} key={movie.id as string} />
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </SimpleGrid>
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context,'context')
  let queryParams=context.query.sortBy as string;
  let url=getPoplular;
  if(queryParams==='Upcoming'){
    url=getUpcomming;
  }
  else if(queryParams==='Popular'){
    url=getPoplular;
  }
  else if(queryParams==='Top_Rated'){
    url=getTopRated;
  }
  else if(queryParams==='Now_Playing'){
    url=getCurrentlyPlaying;
  }
  return {
    props: {
      url
    },
  };
};

export default Movies;
