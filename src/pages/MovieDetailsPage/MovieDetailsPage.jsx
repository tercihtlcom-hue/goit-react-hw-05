import { useEffect, useState, useMemo } from 'react'; // useMemo ekledik
import { useParams, Link, useLocation, Outlet, NavLink } from 'react-router-dom';
import { getMovieDetails, BASE_POSTER_URL } from '../../movies-api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  // useRef yerine useMemo kullanarak hatayı kökten çözüyoruz.
  // Bu değer bileşen ilk yüklendiğinde bir kez hesaplanır ve sabit kalır.
 const backLinkHref = useMemo(() => location.state ?? "/movies", [location.state]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Detaylar yüklenemedi:", error);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      {/* Artık .current demene gerek yok, doğrudan değişkeni kullanıyoruz */}
      <Link to={backLinkHref}>Go back</Link>
      
      <div>
        <img 
          src={movie.poster_path ? `${BASE_POSTER_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750'} 
          alt={movie.title} 
          width="250"
        />
        <h1>{movie.title} ({movie.release_date?.split('-')[0]})</h1>
        <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
      </div>
      <hr />
      <h3>Additional information</h3>
      <ul>
        <li><NavLink to="cast">Cast</NavLink></li>
        <li><NavLink to="reviews">Reviews</NavLink></li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;