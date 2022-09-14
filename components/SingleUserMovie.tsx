import { Grid ,Image, Select} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Clock, PlaylistAdd, UserPlus } from "tabler-icons-react";
import { baseUrl } from "../constants/constants";
import { MovieDetails } from "../typings";
import { fetchUserMovieDetailsById } from "../utils/fetchUserMovieDetails";
import { updateUserMovieType } from "../utils/updateUserMovieType";
interface Props {
  id: string;
  type:string;
  refetch:any
}
function SingleUserMovie(props: Props) {
  const { id ,type,refetch} = props;
  const { data } = useQuery(["api/movies", id], async () =>
    fetchUserMovieDetailsById(id)
  );
  if (!data) {
    return <>Loading...</>;
  }
  const movie: MovieDetails = data.data;
  const types=["WatchList","On Hold","Followed","Planned","Finished"]
  const handleTypeChange=async (e:string)=>{
    // console.log("changing",e);
    updateUserMovieType(id,e);
    refetch();
  }
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Image
            height="40vh"
            width="90%"
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            alt="Poster Movie"
          />
        </Grid.Col>
        <Grid.Col span={8}>
            {movie.title}<br/>
            Status: {movie.status} <br/>
            Ratings: {movie.vote_average} <br/>
            <Select label="Change List" defaultValue={type} data={
                types.map((t)=>{
                    return {value:t,label:t}
                })
            } onChange={e=>handleTypeChange(e as string)}/>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default SingleUserMovie;
