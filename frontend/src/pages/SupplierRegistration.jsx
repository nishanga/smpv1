import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

export default function SupplierRegistration() {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    nic: "",
    fullname: "",
    name_initials: "",
    gender: "",
    email: "",
    phone1: "",
    phone2: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/supplierregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        //alert('Supplier registered successfully!');
        navigate('/viewsuppliers');
        console.log(data);
        setFormData({
          nic: "",
          fullname: "",
          name_initials: "",
          gender: "",
          email: "",
          phone1: "",
          phone2: "",
          address: ""
        });
      } else {
        alert('Failed to register supplier: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving supplier.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"
          } relative z-10`}
      >
        {/* Header */}


        {/* Page Content */}
        <main className="flex-1 p-6 mt-6">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Supplier Registration Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Supplier NIC */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier NIC
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Supplier Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier Name with Initials
                </label>
                <input
                  type="text"
                  name="name_initials"
                  value={formData.name_initials}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Phone2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact 2
                </label>
                <input
                  type="tel"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
                />
              </div>



              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Register Supplier
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}