import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { tmdbApiKey } from "../constants/constants";
import { fetchMovieGenres, fetchTvGenres } from "../utils/fetchHeaderData";
import {useQuery,QueryClientProvider,QueryClient} from '@tanstack/react-query'

const queryClient=new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark" }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
