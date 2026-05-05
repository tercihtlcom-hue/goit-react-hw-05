import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.errorCode}>404</h1>
      <p className={css.message}>Aradığın sayfa mevcut değil kanka.</p>
      <Link to="/" className={css.homeLink}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFoundPage;