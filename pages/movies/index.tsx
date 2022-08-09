import { Button, SimpleGrid,Text } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MovieCard from "../../components/MovieCard";
import { Movies } from "../../typings";
import { fetchInfiniteMovies } from "../../utils/fetchMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
function Movies() {
    const [query,setQuery]=useState({})
  const { height, width } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();
  const { data: movies, isLoading,fetchNextPage } = useInfiniteQuery<Movies>(
    ["/movies/popular",query],
    async ({ pageParam = 1 }) => fetchInfiniteMovies(pageParam,query),
    {
      getNextPageParam: (lastpage) => {
        return lastpage.page + 1;
      },
    }
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  if(scroll.y>=height/2){
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
                    <div key={movie.id}>
                      <MovieCard movie={movie} key={movie.id} />
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </SimpleGrid>
        <Text sx={{position:'sticky',bottom:0}}>Movies
        <Button onClick={()=>setQuery({"with_genres":27})}>Click</Button>
        </Text>
        
      </Layout>
    </div>
  );
}

export default Movies;
