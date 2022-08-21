import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import {
  baseUrl,
  getCurrentlyPlaying,
  getPoplular,
  getTopRated,
  getUpcomming,
} from "../constants/constants";
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
  const types = ["latest"];
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
        <Link href={`/movies?sortBy=Upcoming`}>Upcoming</Link>

        <MoviesSlider url={getUpcomming} />
        <Link href={`/movies?sortBy=Popular`}>Popular</Link>
        <MoviesSlider url={getPoplular} />
        <Link href={`/movies?sortBy=Now_Playing`}>Now Playing</Link>

        <MoviesSlider url={getCurrentlyPlaying} />
        <Link href={`/movies?sortBy=Top_Rated`}>Top Rated</Link>

        <MoviesSlider url={getTopRated} />
      </Layout>
    </div>
  );
};

export default Home;
