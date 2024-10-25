// import React, { useEffect, useState } from "react";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [token] = useState(localStorage.getItem("token"));
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetch("https://strapi-store-server.onrender.com/api/orders", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         setOrders(data.data);
//       })
//       .catch((error) => {
//         setErrorMessage("Failed to fetch orders. Please try again.");
//         console.error("Error:", error);
//       });
//   }, [token]);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         orders.map((value) => (
//           <div key={value.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-center border-b pb-2 mb-2">
//               <h2 className="text-xl font-semibold text-blue-600">{value.attributes.name}</h2>
//               <span className="text-gray-500">{new Date(value.attributes.createdAt).toLocaleDateString()}</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-lg text-gray-700">Address: {value.attributes.address}</span>
//               <span className="text-lg text-gray-700">Total Price:{value.attributes.cartItems.price}</span>
//               <span className="text-lg text-gray-700">{value.attributes.cartItems.count}</span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Orders;

import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrders(data.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch orders. Please try again.");
        console.error("Error:", error);
      });
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((value) => (
          <div key={value.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-xl font-semibold text-blue-600">{value.attributes.name}</h2>
              <span className="text-gray-500">{new Date(value.attributes.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg text-gray-700">Address: {value.attributes.address}</span>
              <span className="text-lg text-gray-700">Total Price: ${value.attributes.orderTotal}</span>
              <span className="text-lg text-gray-700">Items Count: {value.attributes.numItemsInCart}</span>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Items:</h3>
              {value.attributes.cartItems.map((item) => (
                <div key={item.productID} className="flex justify-between">
                  <span>{item.title} </span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
