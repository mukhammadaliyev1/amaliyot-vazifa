

import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    http
      .get("/products")
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  function handleRedirect(id) {
   
  navigate(`/products/${id}`)
    
  }

  return (
    <div>
     


      <h1 className="text-3xl mt-10 font-medium tracking-wider capitalize text-blue-950 mx-10 border-b border-slate-300 pb-5">22 products</h1>
      <div className="flex flex-wrap  mt-10 justify-center">
        {products.length > 0 &&
          products.map((product) => (
            <div
              className="card cursor-pointer w-96   h-80 bg-white p-4 shadow-xl hover:shadow-2xl  transition duration-300 m-2"
              onClick={() => handleRedirect(product.id)}
              key={product.id}
            >
              <figure className="px-4 pt-4">
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className=" w-96 rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-black font-semibold text-xl">
                  {product.attributes.title}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
