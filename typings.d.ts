export interface Genres {
  id: number;
  name: string;
}

export interface ProductionCompanies {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  homepage: string | null;
  id: number;
  orignal_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanies[];
  release_date: string;
  revenue: number;
  runtine: number | null;
  status: "Rumored" | "Planned" | "In Production";
  Released;
  Canceled;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime:string;
}

interface Movies {
  results: MovieDetails[];
  page: number;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}
export interface Comment {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  url: string;
}


export interface Trailers {
  id:number;
  results:Trailer[]
}
export interface Trailer{
  id:string;
  key:string;
  site:string;
  size:number;
  type:string;
  official:boolean;
  published_at:string;
  name:string
}

export interface Discover{
  language:string;
  region:string;
  sort_by:[]
}

