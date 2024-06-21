import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navabar';
import HomePage from './pages/Homepage';
// import AboutPage from './pages/About';
//import Featurepage from './pages/Feature';
// import CreatePoultryRecord from './pages/Feature/CreatePoultryRecord';

import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/Featurepage" element={<Feature />} /> */}
     
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;