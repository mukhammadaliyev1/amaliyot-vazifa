import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App";
import icon from "../assets/shopping-cart-10925.svg";

function HeaderLayout({ children }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.count);
    });
    setCount(sum);
  }, [cart]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div>
      <header className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-base-200'}`}>
        <div className={`container py-2 text-neutral-content flex gap-5 justify-end px-20 mx-auto`}>
          <Link to={"/login"} className={isDarkMode ? 'text-white' : 'text-neutral'}>Sign in</Link>
          <Link to={"/register"} className={isDarkMode ? 'text-white' : 'text-neutral'}>Create account</Link>
        </div>

        <div className={`w-full py-2 px-32 flex justify-between ${isDarkMode ? 'bg-gray-700' : 'bg-slate-100'}`}>
          <button
            onClick={handleClick}
            className="btn btn-info bg-blue-600 text-white text-2xl"
          >
            C
          </button>

          <div className="flex gap-5">
            <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/"}>Home</Link>
            <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/about"}>About</Link>
            <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/products"}>Products</Link>
            <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/cart"}>Cart</Link>

            {localStorage.getItem("token") && (
              <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/checkout"}>Checkout</Link>
            )}

            {localStorage.getItem("token") && (
              <Link className={`text-xl hover:bg-slate-700 p-2 py-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} to={"/orders"}>Orders</Link>
            )}
          </div>

          <div className="flex gap-8">
            <button onClick={toggleTheme} className="text-xl text-white">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <div className="flex">
              <img src={icon} alt="" className="w-8 h-8 mt-2" />
              <p className="w-6 h-6 rounded-full bg-blue-600 flex justify-center text-white items-center">{count}</p>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default HeaderLayout;
