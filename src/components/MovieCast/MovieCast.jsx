import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, BASE_POSTER_URL } from '../../movies-api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setCast);
  }, [movieId]);

  if (cast.length === 0) return <p>We don't have any cast info for this movie.</p>;

  return (
    <ul>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id}>
          <img src={profile_path ? `${BASE_POSTER_URL}${profile_path}` : 'https://via.placeholder.com/100x150'} alt={name} width="100" />
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;