export const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const tmdbApiKey=process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const getPoplular=`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`;
export const getCurrentlyPlaying=`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}`;
export const getTopRated=`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`;
export const getUpcomming=`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}`;