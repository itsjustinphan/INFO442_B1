import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from './About';
import NavBar from './NavBar';
import Home from './Home';
// import Resources from './Resources';
import Quiz from './Quizcopy1';
import Happy from './happy';
import Sad from './sad';
import Anger from './anger';
import Fear from './fear';
import Stress from './stress';
import Footer from './Footer';

export function handleScroll() {
  window.scroll({
    top: document.body.offsetHeight,
    left: 0, 
    behavior: 'smooth',
  });
}

function App(props) {
  return (
    <div>
      <Router>
        <NavBar />
    {/* establishes routing between pages */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Quizcopy1" element={<Quiz />} />
          {/* <Route path="/Resources" element={<Resources />} /> */}
          <Route path="/happy" element={<Happy />} />
          <Route path="/sad" element={<Sad />} />
          <Route path="/anger" element={<Anger />} />
          <Route path="/stress" element={<Stress />} />
          <Route path="/fear" element={<Fear />} />
        </Routes>
        <Footer/> 
    </Router>
  </div>

  );
}

export default App;

