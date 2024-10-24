import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  function handleRemove(id, color) {
    let copied = [...cart];
    copied = copied.filter(
      (value) => !(value.id === id && value.color === color)
    );
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  function handleChangeCount(count, id, color) {
    let copied = [...cart];
    copied = copied.map((value) => {
      if (value.id === id && value.color === color) {
        value.count = Number(count);
      }
      return value;
    });
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  function handleCheckout() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  }

  let title = cart.length === 0 ? "Your Cart is Empty" : "Shopping Cart";

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-medium tracking-wider capitalize text-blue-950 mt-20 border-b p-4 border-slate-200">
        {title}
      </h1>
      {cart.length > 0 &&
        cart.map((value) => (
          <div
            key={value.data.id}
            className="container mt-10 mx-auto mb-12 flex gap-32 flex-wrap border-b border-slate-200 pb-5"
          >
            <div className="img">
              <img
                src={value.data.attributes.image}
                alt=""
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="capitalize font-medium text-blue-950">
                {value.data.attributes.title}
              </h3>
              <h3 className="mt-2 capitalize text-sm text-neutral-content">
                {value.data.attributes.company}
              </h3>
              <p className="mt-4 text-sm capitalize text-slate-600 flex items-center gap-x-2">
                Color:{" "}
                <span
                  className="badge badge-sm rounded-full"
                  style={{ background: value.color }}
                >
                  {value.data.attributes.colors.value}
                </span>
              </p>
            </div>
            <div className="amount flex flex-col gap-2">
              <p>Amount</p>
              <select
                className="rounded-lg bg-inherit border border-b-slate-200 text-black"
                value={value.count}
                onChange={(e) =>
                  handleChangeCount(e.target.value, value.id, value.color)
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <span
                className="cursor-pointer text-blue-700"
                onClick={() => handleRemove(value.id, value.color)}
              >
                remove
              </span>
            </div>
            <h1 className="text-xl text-blue-950">
              ${value.data.attributes.price / 100}
            </h1>
            <div className="w-72 rounded-xl h-52 p-4 bg-slate-200">
              <h1 className="text-2xl text-black">Subtotal </h1>
              <p>{(value.data.attributes.price / 100) * value.count}</p>
            </div>
            {cart.length > 0 && (
              <button
                className="btn ml-[900px]  -mt-24 btn-primary text-white text-2xl"
                onClick={handleCheckout}
              >
                {localStorage.getItem("token")
                  ? "PROCEED TO CHECKOUT"
                  : "PLEASE LOGIN"}
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Cart;
