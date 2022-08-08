import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { Button, Grid, Group, Image, Select, SelectItem, Stack, Tabs, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import {
  fetchMovieById,
  fetchSimilarMovies,
  fetchTrailers,
} from "../../utils/fetchMovieData";
import { baseUrl } from "../../constants/constants";
import { MovieDetails, Movies, Trailers } from "../../typings";
import SimilarMovieCard from "../../components/SimilarMovieCard";
import ReactPlayer from "react-player/lazy";
interface Comp {
  id: number;
  name: string;
}
interface Props {
  id: {
    movieId: string;
  };
}

function Movie(props: Props) {
  const router = useRouter();
  const [videoIndex,setVideoIndex]=useState(0);
  const id = parseInt(props.id.movieId as string);
  const { data: movie } = useQuery<MovieDetails>(["api/movie"], async () =>
    fetchMovieById(id)
  );
  const [page, setPage] = useState(1);
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
  const { data: trailers,isLoading } = useQuery<Trailers>(
    ["/movies/trailer", id],
    async () => fetchTrailers(id)
  );
  //   const {data:similarMovies}=useQuery(['api/similar'],()=>fetchSimilarMovies(id))
  // console.log(router.query); isSuccess
  if (!movie || !similarMovies || !trailers ) {
    return <div>Loading</div>;
  }
  console.log(trailers, "trailers");
  const trailersData:SelectItem[] = trailers?.results.map((trailer) => {
    return {
      value: trailer.id,
      label: trailer.name,
    };
  }) as SelectItem[];
  function handleUrlChange(e:string): void {
    // setVideoUrl(e.target.value)
    console.log(e)
    setVideoIndex(trailers?.results.findIndex((trailer)=>{
      return trailer.id===e;
    }) as number)
  }
  // console.log("id movie", id);
  // console.log('similar movies',similarMovies);
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
              {movie?.production_companies.map(({ id, name }: Comp) => {
                return <li key={id}>{name}</li>;
              })}
            </ol>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text sx={{ fontSize: "3rem", paddingTop: "5rem" }}>
              {movie?.original_title}
            </Text>

            <Group>
              <span>Genres </span>
              {movie?.genres.map(({ id, name }: Comp) => {
                return <span key={id}>{name}</span>;
              })}
            </Group>
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
                    console.log(movies, index);
                    return (
                      <React.Fragment key={index}>
                        {movies.results.map((movie) => {
                          return (
                            <SimilarMovieCard key={movie.id} movie={movie} />
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </Stack>
                Similar
                <Button onClick={() => fetchNextPage()}>Fetch nect page</Button>
              </Tabs.Panel>
              <Tabs.Panel value="Trailer">
                <Select data={trailersData} searchable nothingFound="no options" onChange={(e)=>handleUrlChange(e as string)}/>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailers?.results[videoIndex].key}`}
                  controls
                />
              </Tabs.Panel>
            </Tabs>
            <br />
          </Grid.Col>
        </Grid>
      </Layout>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  console.log(context.params);
  return {
    props: { id: context.params },
  };
};
export default Movie;


