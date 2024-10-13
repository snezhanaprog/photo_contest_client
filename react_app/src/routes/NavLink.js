import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return token !== null;
};


function NavLink() {
  const navigate = useNavigate(); 
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/log');
  };

  return (
  <>
    <nav>
      {authenticated ? (
        <>
        <Link to='/profile'>Профиль</Link>
        <button onClick={handleLogout}>Выйти</button>
        </>
      ):(
        <>
        <Link to="/">Регистрация</Link>
        <Link to="/log">Авторизация</Link>
        </>
      )}
    </nav>
  </>
  );
}

export default NavLink;