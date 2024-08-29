import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Authorization from '../pages/Authorization.js';
import Registration from '../pages/Registration.js';

function RouterApp() {
  return (
  <>
    <Router>
        <nav>
          <Routes>
              <Route path="/" element={<Registration/>} />
              <Route path="/log" element={<Authorization/>}/>
              <Route path="/exit" />
          </Routes>
        </nav>
    </Router>
    </>
  );
}

export default RouterApp;