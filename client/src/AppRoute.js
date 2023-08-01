import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Gallery from './Gallery';
import Album from './Album';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/album' element={<Album/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
