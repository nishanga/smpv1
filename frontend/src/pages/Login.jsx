import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      //alert('Login successful');
      //console.log(res.data.user);
      console.log("Frontend user:", res.data.user);

      localStorage.setItem('schoolName', res.data.user.school);
      localStorage.setItem('schollcensus', res.data.user.schoolcensus);

       navigate('/dashboard');

    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          SMIS Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          &copy; 2025 School Meal System
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
