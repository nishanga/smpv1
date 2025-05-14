import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SchoolMeal from './pages/SchoolMeal';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>           
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/meal" element={<SchoolMeal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;