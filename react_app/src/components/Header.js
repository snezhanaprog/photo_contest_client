import RouterApp from '../routes/RoutesApp';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLink from '../routes/NavLink';

function Header() {
  return (
    <>
        <div className="d-flex flex-row justify-content-between p-5">
            <Link to='/photos'>Все фото</Link>
            <UserInfo />
            <NavLink />
        </div>

    </>
  );
}

export default Header;