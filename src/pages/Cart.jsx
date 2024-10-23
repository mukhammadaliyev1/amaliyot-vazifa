import React, { useContext, useEffect } from "react";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  console.log(cart);
  
  function handleRemove(id, color) {
    let copied = [...cart];
    copied = copied.filter(function (value) {
      return !(value.id === id && value.color === color);
    });
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  let title;
  if (cart.length === 0) {
    title = "Your Cart is Empty";
  } else {
    title = "Shopping Cart";
  }

  function handleChangeCount(count, id, color) {
    let copied = [...cart];
    copied = copied.map(function (value) {
      if (value.id === id && value.color === color) {
        value.count = Number(count);
      }
      return value;
    });
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  return (
    <div className="mx-10 ">
      <h1 className="text-3xl font-medium tracking-wider capitalize text-blue-950 mt-20 border-b  p-4 border-slate-200">{title}</h1>
      {cart.length > 0 &&
        cart.map((value) => (
          <div
            key={value.data.id}
            className=" container mt-10  mx-auto mb-12 flex  gap-32 flex-wrap border-b border-slate-200 pb-5 "
          >
            <div className="img">
              <img
                src={value.data.attributes.image}
                alt=""
                className="w-32 h-32 rounded-lg object-cover "
              />
            </div>
            <div className="">
              <h3 className="capitalize font-medium text-blue-950">
                {value.data.attributes.title}
              </h3>
              <h3 className="mt-2 capitalize text-sm text-neutral-content">
                {value.data.attributes.company}
              </h3>
              <p className="mt-4 text-sm capitalize text-slate-600 flex items-center gap-x-2 ">
                Color:{" "}
                <span
                  className="badge badge-sm rounded-full"
                  style={{ background: value.color }}
                >
                  {" "}
                  {value.data.attributes.colors.value}
                </span>
              </p>
            </div>
            <div className="amount flex flex-col gap-2">
              <p>Amount</p>
              <select
              className="rounded-lg bg-inherit border border-b-slate-200 text-black"
                value={value.count}
                onChange={(e) => {
                  handleChangeCount(e.target.value, value.id, value.color);
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <span
                className="cursor-pointer text-blue-700"
                onClick={() => {
                  handleRemove(value.id, value.color);
                }}
              >
                remove
              </span>
            </div>
            <h1 className="text-xl text-blue-950 ">${value.data.attributes.price/100}</h1>
             
             <div className=" w-72  rounded-xl   h-52 bg-slate-200"></div>
          </div>
        ))}
    </div>
  );
}

export default Cart;
