import { ActionIcon, Badge } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CircleMinus, CirclePlus, FolderOff } from "tabler-icons-react";
import styles from '../styles/MovieOptions.module.css'
import { MovieDetails } from "../typings";


interface Props{
    movie:MovieDetails
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
    setWatchlist(!watchlist)
    if(watchlist){
        
    }
    else{

    }
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
