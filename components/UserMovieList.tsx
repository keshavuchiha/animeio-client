import { SimpleGrid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { UserType } from "../typings";
import SingleUserMovie from "./SingleUserMovie";
interface Props {
  user: UserType;
  type: string;
  refetch:any
}
function UserMovieList(props: Props) {
  const { user, type,refetch } = props;
  // console.log(user);
  const temp=user.MoviesList.filter((movie) => {
    //   console.log(movie.ListType);
        return movie.ListType===type;
    }).map((movie)=>{
        return movie.MovieRef;
    }).filter((x,i,a)=>{
        return a.indexOf(x)==i;
    })
  const [moviesList, setMoviesList] = useState(temp);
  useEffect(()=>{
    setMoviesList(user.MoviesList.filter((movie) => {
        //   console.log(movie.ListType);
        return movie.ListType===type;
        }).map((movie)=>{
            return movie.MovieRef;
        }))
  },[type,user.MoviesList]);
  return (
    <>
      <SimpleGrid cols={2} spacing="lg">
        {moviesList.map((movie) => {
          return (
            <div key={movie}>
              <SingleUserMovie id={movie} type={type} refetch={refetch}/>
            </div>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default UserMovieList;
