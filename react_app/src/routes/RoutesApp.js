import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Authorization from '../pages/Authorization';
import Registration from '../pages/Registration';
import Photos from '../pages/Photos';
import UserProfile  from '../pages/UserProfile'

function RouterApp() {
  return (
  <>
    <Router>
        <nav>
          <Routes>
              <Route path="/" element={<Registration/>} />
              <Route path="/log" element={<Authorization/>}/>
              <Route path='/photos' element={<Photos/>} />
              <Route path='/profile' element={<UserProfile/>} />
          </Routes>
        </nav>
    </Router>
    </>
  );
}

export default RouterApp;