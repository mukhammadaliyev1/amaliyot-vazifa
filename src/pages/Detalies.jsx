import React, { useContext, useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../App";
import { data } from "autoprefixer";

function Detalies() {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    http
      .get(`/products/${id}`)
      .then((data) => {
        if (data.status === 200) {
          setProduct(data.data.data);
          setColor(data.data.data.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleSetCart(e) {
    e.preventDefault();
    let data = {
      count: Number(count),
      color: color,
      id: product.id,
      data: product,
    };

    let copied = [...cart];

    let isExist = copied.find(function (c) {
      return c.id == data.id && color == c.color;
    });
    if (!isExist) {
      copied = [...cart, data];
    } else {
      copied = copied.map(function (value) {
        if (value.id == data.id && value.color == color) {
          value.count = Number(value.count);
          value.count += Number(data.count);
        }

        return value;
      });
    }
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  return (
    <div>
      {product.id && (
        <>
          <div className="container mx-auto flex gap-2">
            <div className="mx-10 mt-4 flex gap-3">
              <Link className="text-gray-400" to={"/"}>
                Home
              </Link>
              <Link className="text-gray-400" to={"/products"}>
                Products
              </Link>
            </div>
          </div>

          <div className="container mx-auto flex gap-16">
            <div className="mx-10 mt-10">
              <img
                className="w-[500px] h-96 object-cover rounded-md"
                src={product.attributes.image}
                alt=""
              />
            </div>

            <div className="mt-10">
              <h1 className="capitalize text-3xl font-bold text-gray-700">
                {product.attributes.title}
              </h1>
              <h4 className="text-xl text-neutral-content font-bold mt-2">
                {product.attributes.company}
              </h4>
              <p className="mt-3 text-xl text-gray-900">
                {product.attributes.price} $
              </p>
              <p className="mt-6 w-96 text-blue-950">
                {product.attributes.description}
              </p>
              <h1>Colors</h1>

              <div className="flex gap-3">
                {product.attributes.colors.length > 0 &&
                  product.attributes.colors.map((colorProduct) => {
                    return (
                      <span
                        key={colorProduct}
                        style={{
                          backgroundColor: colorProduct,
                          border:
                            color === colorProduct ? "1px solid black" : "none",
                        }}
                        className="block w-3 h-3 rounded-full cursor-pointer"
                        onClick={() => setColor(colorProduct)}
                      ></span>
                    );
                  })}
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="mt-4">Amount</h1>
                <select className="w-32 bg-gray-100 border border-black text-black rounded-md p-2"
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                >
                  {[...Array(8)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <button onClick={handleSetCart} className="btn btn-primary w-40 text-white">
                  ADD TO BAG
                </button>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detalies;
