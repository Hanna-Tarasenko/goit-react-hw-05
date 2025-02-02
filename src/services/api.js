import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjIyN2Q0NzI2NzM3NTNkMGUyNGU3Y2I2ZjZhZjc2NCIsIm5iZiI6MTczODA5NjAwMy42NzYsInN1YiI6IjY3OTkzZDgzNzc5MjVhZDdlZTJhZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cdreLQ64lVcX1Om8bb3mKTm3_M4wJTObWnmgBFuwP4g";
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axiosInstance.get("/trending/movie/day");
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await axiosInstance.get("/search/movie", {
      params: {
        query: encodeURIComponent(query),
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error("Error searching for movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};
