import React, { useState } from "react";
import { Tabs, Stack, Button, Select, SelectItem } from "@mantine/core";
import { MovieDetails, Movies, Trailers } from "../typings";
import {useInfiniteQuery, useQuery } from "@tanstack/react-query";
import SimilarMovieCard from "./SimilarMovieCard";
import { fetchSimilarMovies, fetchTrailers } from "../utils/fetchMovieData";
import ReactPlayer from "react-player/lazy";
interface Props {
  movie: MovieDetails;
  id: string;
}
function MovieTabs(props: Props) {
  const { movie, id } = props;
  const [hasNextPage,setHasNextPage]=useState(true);
  const [videoIndex, setVideoIndex] = useState(0);
  const { data: similarMovies, fetchNextPage } = useInfiniteQuery<Movies>(
    ["/similar/movies", id],
    async ({ pageParam = 1 }) => fetchSimilarMovies(id, pageParam),
    {
      getNextPageParam: (lastpage: Movies) => {
        if (lastpage.page) {
          // setPage(lastpage.page+1);
          return lastpage.page + 1;
        }
        return undefined;
      },
    }
  );
  const { data: trailers, isLoading } = useQuery<Trailers>(
    ["/movies/trailer", id],
    async () => fetchTrailers(id)
  );
  if(!similarMovies || !trailers || isLoading){
    return <>Loading...</>
  }
  const trailersData: SelectItem[] = trailers?.results.map((trailer) => {
    return {
      value: trailer.id,
      label: trailer.name,
    };
  }) as SelectItem[];

  function handleUrlChange(e: string): void {
    // setVideoUrl(e.target.value)
    // console.log(e);
    setVideoIndex(
      trailers?.results.findIndex((trailer) => {
        return trailer.id === e;
      }) as number
    );
  }
  return (
    <>
      <Tabs color="gray" variant="pills" defaultValue="Synopsis">
        <Tabs.List>
          <Tabs.Tab value="Synopsis">Synopsis</Tabs.Tab>
          <Tabs.Tab value="Similar">Similar</Tabs.Tab>
          <Tabs.Tab value="Trailer">Trailer</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Synopsis">{movie?.overview}</Tabs.Panel>
        <Tabs.Panel value="Similar">
          {/* {console.log('similar',similarMovies)} */}
          <Stack sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            {similarMovies?.pages.map((movies, index) => {
              return (
                <React.Fragment key={index}>
                  {movies.results.map((movie) => {
                    return <SimilarMovieCard key={movie.id as string} movie={movie} />;
                  })}
                </React.Fragment>
              );
            })}
          </Stack>
          {similarMovies?.pages[similarMovies?.pages.length-1]?.page<similarMovies?.pages[0]?.total_pages && <Button onClick={() => fetchNextPage()}>Fetch next page</Button>}
          
          
        </Tabs.Panel>
        <Tabs.Panel value="Trailer">
          <Select
            data={trailersData}
            searchable
            nothingFound="no options"
            onChange={(e) => handleUrlChange(e as string)}
          />
          {
            trailers.results[videoIndex] && <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailers?.results[videoIndex].key}`}
            controls
          />
          }
          
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default MovieTabs;
