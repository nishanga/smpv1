import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <nav className="space-x-4">
         <Link to="/" className="hover:underline">Home</Link>
         <Link to="/about" className="hover:underline">About</Link>
         <Link to="/contact" className="hover:underline">Contact</Link>
         <Link to="/meal" className="hover:underline">Meal</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;