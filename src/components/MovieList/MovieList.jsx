import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Kullanıcının nereden geldiğini kaydetmek için

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          {/* state={location} sayesinde detay sayfasından geri dönebiliriz */}
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;