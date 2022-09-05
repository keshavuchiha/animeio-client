import { ActionIcon, Badge } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CircleMinus, CirclePlus, FolderOff } from "tabler-icons-react";
import styles from '../styles/MovieOptions.module.css'
import { MovieDetails } from "../typings";


interface Props{
    movie:MovieDetails
    watchlist:boolean 
}

function MovieOptions(props:Props) {
  const [watchlist, setWatchlist] = useState(false);
  const [follow,setFollow]=useState(false);
  const {movie}=props;
  const {data:session,status}=useSession();
  if(!session){
    return <></>
  }
  const handleWatchList=async ()=>{
    
    
    console.log(watchlist,'watchlist')
    if(watchlist===true){
        console.log('there');
        const response=await fetch(`/api/user/movies/${movie.id}`,{
          method:"POST",
          body:JSON.stringify(movie)
        })
        console.log(response,'res');
    }
    else{

    }
    setWatchlist(!watchlist)
  }
  return (
    <>
      <Badge color={watchlist?'red':'blue'} size='lg' leftSection={
        <ActionIcon>
        {watchlist ? <CircleMinus color="red"/> : <CirclePlus color="blue"/>}
      </ActionIcon>
      } onClick={() => handleWatchList()}>
        {watchlist?"Remove":"WatchList"}
      </Badge>
      <Badge color={follow?'red':'blue'} size='lg' leftSection={
        <ActionIcon >
        {follow ? <CircleMinus color="red"/> : <CirclePlus color="blue"/>}
      </ActionIcon>
      } onClick={() => setFollow(!follow)}>
        {follow?"Unfollow":"Follow"}
      </Badge>
    </>
  );
}

export default MovieOptions;
