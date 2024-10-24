import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      identifier: email,
      password,
    };

    fetch("https://strapi-store-server.onrender.com/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setMessage(data.error.message || "Error 404.");
          });
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        navigate("/");
      })
      .catch((error) => {
        setMessage("Biror xato yuz berdi.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className=" font-semibold mb-6 text-center text-3xl text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <input
            placeholder="enter email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border bg-white text-black border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
        
            </label>
            <input
            placeholder="enter password.."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 bg-white text-black rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-xl  mt-3">Hisobingiz yo'qmi ?  <Link className="text-xl text-blue-700" to={'/register'}>Register</Link></p>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
 