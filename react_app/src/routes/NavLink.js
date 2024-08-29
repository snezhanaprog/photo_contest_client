import { Link } from 'react-router-dom';

function NavLink() {
  return (
  <>
    <nav>
        <Link to="/">Регистрация</Link>
        <Link to="/log">Авторизация</Link>
        <Link to="/exit">Выйти</Link>
    </nav>
  </>
  );
}

export default NavLink;