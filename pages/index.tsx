import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { baseUrl } from "../constants/constants";
import styles from "../styles/Home.module.css";
import { tmdbApiKey } from "../constants/constants";
import Link from "next/link";
import { MovieDetails, Movies } from "../typings";
import BannerCarousel from "../components/BannerCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../utils/fetchMovies";
import MoviesSlider from "../components/MovieSlider";

interface Props {}

const Home: NextPage = (props: Props) => {
  const types=['latest'];
  return (
    <div>
      <Head>
        <title>Animeio</title>
        <meta
          name="description"
          content="Best Site to view anime, movies and tv shows"
        />
      </Head>
      <Layout>
        <BannerCarousel />
        {types.map(type=>{
          let typeString=type;
          typeString=typeString[0].toUpperCase()+typeString.slice(1);
          typeString.replace('_',' ');
          return <div key={type}>
          {typeString}
            <MoviesSlider type={type}/>
          </div>
        })}
      </Layout>
    </div>
  );
};

export default Home;
