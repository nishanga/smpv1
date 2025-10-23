import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SchoolMeal from './pages/SchoolMeal';
import Login from './pages/Login';
import Dashboard1 from './pages/SchoolDashboard';
import AnnualForm from './pages/AnnualForm';
import SupplierForm from './pages/SupplierRegistration';
import SupplierView from './pages/SupplierList';
import Reports from './pages/Reports';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>           
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/meal" element={<SchoolMeal />} />           
            <Route path="/dashboard" element={<Dashboard1 />} />
            <Route path="/annualform" element={<AnnualForm />} />
            <Route path="/supplierregister" element={<SupplierForm />} />
            <Route path="/viewsuppliers" element={<SupplierView />} />
            <Route path="/reports" element={<Reports />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;