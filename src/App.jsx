import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ErrorPage from "./pages/ErrorPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detalies from "./pages/Detalies";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import HeaderLayout from "./Layout/HeaderLayout";

export const CartContext = createContext();

export const ThemeContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (
        !(
          location.pathname.includes("register") ||
          location.pathname.includes("about") ||
          location.pathname.includes("/") ||
          location.pathname.includes("products") ||
          location.pathname.includes("cart")
        )
      ) {
        navigate("/login");
      }
    }
  }, [navigate]);

  function PrivateRoute({ isAuth, children }) {
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return isAuth ? children : null;
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route
            path="/"
            element={
              <HeaderLayout>
                <Home></Home>
              </HeaderLayout>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <HeaderLayout>
                <About></About>
                
              </HeaderLayout>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <HeaderLayout>
                <Products></Products>
              </HeaderLayout>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <HeaderLayout>
                <Cart></Cart>
              </HeaderLayout>
            }
          ></Route>
          <Route
            path="/products/:id"
            element={
              <HeaderLayout>
                <Detalies></Detalies>
              </HeaderLayout>
            }
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route
            path="/orders"
            element={
              <PrivateRoute isAuth={!!token}>
                <HeaderLayout>
                  <Orders />
                </HeaderLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute isAuth={!!token}>
                <HeaderLayout>
                  <Checkout />
                </HeaderLayout>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
