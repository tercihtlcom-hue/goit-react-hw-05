import axios from 'axios';

// Görseldeki "API Okuma Erişim Jetonu" (eyJhbGci...) kısmını buraya yapıştır
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgyZWFkMThiMWY4NzJmNDliNmQwMWUxODVkMDA0YyIsIm5iZiI6MTc3Nzg0NDg0NS41NjksInN1YiI6IjY5ZjdjMjZkNDA5ODBhOGQxNmM1ZmU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NDFwE0U-qWqFf-ru-TyEf-WniWT42nqrVdhYJUeoaHQ'; 

// Resimlerin tam yolunu oluşturmak için gereken temel URL
export const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// Ödevin istediği Authorization HTTP başlığı ayarı
const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: 'application/json',
  }
};

// 1. Trend olan filmler (HomePage için)
export const getTrendingMovies = async () => {
  const response = await axios.get('/trending/movie/day?language=en-US', options);
  return response.data.results;
};

// 2. Anahtar kelime ile film arama (MoviesPage için)
export const searchMovies = async (query) => {
  const response = await axios.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
  return response.data.results;
};

// 3. Film detaylarını sorgulama (MovieDetailsPage için)
export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

// 4. Oyuncu kadrosunu sorgulama (MovieCast için)
export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`, options);
  return response.data.cast;
};

// 5. Film incelemelerini sorgulama (MovieReviews için)
export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews?language=en-US`, options);
  return response.data.results;
};