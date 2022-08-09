import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { tmdbApiKey } from "../constants/constants";
import { fetchMovieGenres, fetchTvGenres } from "../utils/fetchHeaderData";
import {useQuery,QueryClientProvider,QueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
const queryClient=new QueryClient();

function MyApp({ Component, pageProps :{session,...pageProps}}: AppProps) {
  const router=useRouter()
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark" }}
        >
          <Component {...pageProps} key={router.asPath}/> 
        </MantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
