import { Header, Group, TextInput, ActionIcon, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BrandAsana, Search } from "tabler-icons-react";
import MainMenu from "./MainMenu";
import styles from "../styles/Layout.module.css";
import LoginBtn from "./LoginBtn";
import { tmdbApiKey } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres, fetchTvGenres } from "../utils/fetchHeaderData";
import { Genres } from "../typings";
interface Props {
  children: React.ReactNode;
}
interface GenreObject{
  genres:Genres[]
}

function Layout(props: Props) {
  const [value, setValue] = useState("");
  const {data:movieGenres,isLoading:movieGenreLoading}=useQuery<GenreObject>(['/movie/genres'],()=>fetchMovieGenres());
  const {data:tvGenres,isLoading:tvGenreLoading}=useQuery<GenreObject>(['/tv/genres'],()=>fetchTvGenres());
  if(movieGenreLoading || tvGenreLoading){
    return (<>
      <h3>Loading...</h3>
    </>)
  }
  // console.log(movieGenres?.genres[0].name,tvGenres?.genres,"layout");
  const { children } = props;

  return (
    <>
    {/* {console.log(genres,"layout")} */}
      <Header height="10vh" className={styles.mainHeader}>
        <Group>
          <BrandAsana color="red" size="2.5rem" />
          <span>Animeio</span>
          <span>
            <MainMenu />
          </span>
        </Group>
        <Group>
          <TextInput
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ActionIcon>
            <Search />
          </ActionIcon>
          <LoginBtn>SignIn</LoginBtn>
        </Group>
      </Header>
      {children}
    </>
  );
}

export default Layout;
