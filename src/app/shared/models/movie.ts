export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  video: boolean;
  status: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  runtime: number;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  production_companies: {
    id: number;
    name: string;
    logo: string;

    origin_country: string;
  }[];
}
