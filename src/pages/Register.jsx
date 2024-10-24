import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    fetch("https://strapi-store-server.onrender.com/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error.message || "Registration failed.");
          });
        }
        return response.json();
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-4xl font-semibold mb-6 text-center text-black ">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          
            <input
            placeholder="Enter username..."
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border bg-white text-black border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            />
          </div>
          <div className="mb-4">
           
            <input
            placeholder="Enter email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="  bg-white text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            />
          </div>
          <div className="mb-4">
            
            <input
            placeholder="enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="  bg-white text-black  mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold bg-blue-600 text-white  rounded-md p-2 hover:bg-blue-700 transition"
          >
            Register
          </button>


        <p className="text-xl text-black mt-3">Allaqachon hisobingiz bormi? <Link to={'/login'} className="text-xl text-blue-700">Login</Link></p>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
