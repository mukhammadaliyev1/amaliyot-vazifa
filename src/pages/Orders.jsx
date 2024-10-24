import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/orders", {
      method: "GET",
      headers: {
      
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to place order. Please try again.");
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <h1>Your Orders</h1>
      {orders.map(function (value) {
        return (
          <>
          
         <div className=" mx-auto">
         <div className=" container mx-auto justify-center flex flex-wrap  gap-10">
          <h1 className="w-40 mb-3  text-2xl text-black font-medium ">Name</h1>
        
        <h1 className="w-48 text-2xl text-black font-medium">Adress</h1>
        <h1 className="w-40 text-2xl text-black font-medium">Date</h1>
        

          </div>
          <div className=" container mx-auto justify-center flex flex-wrap  gap-10">
            
          <h1 className="w-40 mb-3  capitalize  text-xl text-blue-600 font-bold ">{value.attributes.name}</h1>
        
            <h1 className="w-40  capitalize text-xl text-blue-600 font-bold">{value.attributes.address}</h1>
            <h1 className=" capitalize  text-blue-600 font-bold">{value.attributes.createdAt}</h1>
            <h1>{value.attributes.cartItems.price}</h1>
            

          </div>
          
         </div>

          </>
        );
      })}
    </div>
  );
}

export default Orders;
