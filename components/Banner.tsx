import { Button, Image, Text } from "@mantine/core";
import React from "react";
import { baseUrl } from "../constants/constants";
import { MovieDetails } from "../typings";
import styles from "../styles/Layout.module.css";
import { BrandGooglePlay, InfoCircle } from "tabler-icons-react";
import Link from "next/link";
interface Props {
  movie?: MovieDetails;
}
function Banner(props: Props) {
  const { movie } = props;
  return (
    <Link href={`/movies/${movie?.id}`}>
      <div className={styles.banner}>
        <Image
          height="65vh"
          width="100%"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="Poster Movie"
          className={styles.bannerImage}
        />
        <div className={styles.bannerText}>
          <Text
            sx={(theme) => ({
              fontSize: "1.5rem",
            })}
          >
            {movie?.title || movie?.original_title}
          </Text>
          <Text
            sx={(theme) => ({
              textShadow: theme.shadows.md,
            })}
          >
            {movie?.overview}
          </Text>
          {/* <Button className={styles.bannerButton} variant="white" radius='md' leftIcon={<BrandGooglePlay color="red" />}>
            Play
          </Button>
          <Button className={styles.bannerButton} color="gray" radius="md" leftIcon={<InfoCircle/>}>
          More Info
        </Button> */}
        </div>
      </div>
    </Link>
  );
}

export default Banner;
