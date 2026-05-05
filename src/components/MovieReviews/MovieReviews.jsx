import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';

const MovieReviews = () => {
  const { movieId } = useParams(); //
  const [reviews, setReviews] = useState([]); //

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]); //

  if (reviews.length === 0) return <p>Henüz bu film için bir inceleme yazılmamış.</p>; //

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id} style={{ marginBottom: '20px' }}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;