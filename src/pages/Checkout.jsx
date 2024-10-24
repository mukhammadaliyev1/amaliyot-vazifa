// import React, { useContext, useRef, useState } from "react";
// import { CartContext } from "../App";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cart, setCart } = useContext(CartContext);
//   const nameRef = useRef();
//   const addressRef = useRef();
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleOrder = () => {
//     setLoading(true);
//     setErrorMessage("");

//     const cartItems = cart.map((item) => ({
//       amount: item.amount,
//       productID: item.id,
//       price: (item.data.attributes.price / 100).toFixed(2),
//       title: item.data.attributes.title,
//     }));

//     const data = {
//       data: {
//         address: addressRef.current.value,
//         cartItems: cartItems,
//         chargeTotal: "37898",
//         name: nameRef.current.value,
//         numItemsInCart: cart.length.toString(),
//         orderTotal: "378",
//       },
//     };

//     fetch("https://strapi-store-server.onrender.com/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         if (data.status === 200) {
//           navigate("/orders")
//           setCart([]);
//           localStorage.removeItem("cart"); // LocalStorage'dan o'chirish
//           ; // Orders sahifasiga o'tish
//         }
//       })
//       .catch((error) => {
//         setErrorMessage("Failed to place order. Please try again.");
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="checkout my-container p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-md">
//       <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-600">
//         Checkout
//       </h2>

//       {cart.length > 0 && (
//         <div className="shipping w-full max-w-md flex flex-col gap-4">
//           <h2 className="font-bold text-xl">Shipping Information</h2>
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-2">
//               <label htmlFor="name" className="font-semibold">
//                 First Name
//               </label>
//               <input
//                 ref={nameRef}
//                 type="text"
//                 id="name"
//                 className="py-2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label htmlFor="address" className="font-semibold">
//                 Address
//               </label>
//               <input
//                 ref={addressRef}
//                 type="text"
//                 id="address"
//                 className="py-2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//             <button
//               className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition duration-200 hover:bg-blue-700"
//               type="button"
//               onClick={handleOrder}
//             >
//               {loading ? "PLACING ORDER..." : "PLACE YOUR ORDER"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useContext, useRef, useState } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const nameRef = useRef();
  const addressRef = useRef();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOrder = () => {
    setLoading(true);
    setErrorMessage("");

    const cartItems = cart.map((item) => ({
      amount: item.amount,
      productID: item.id,
      price: (item.data.attributes.price / 100).toFixed(2),
      title: item.data.attributes.title,
    }));

    const data = {
      data: {
        address: addressRef.current.value,
        cartItems: cartItems,
        chargeTotal: "37898", // Haqiqiy summaga o'zgartiring
        name: nameRef.current.value,
        numItemsInCart: cart.length.toString(),
        orderTotal: "378", // Haqiqiy summaga o'zgartiring
      },
    };

    fetch("https://strapi-store-server.onrender.com/api/orders"   , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status === 200) {
          // Cartni tozalash
          setCart([]);
          localStorage.removeItem("cart"); // LocalStorage'dan o'chirish

          // Formani tozalash
          nameRef.current.value = "";
          addressRef.current.value = "";

          // Orders sahifasiga o'tish
          navigate("/orders");
        } else {
          setErrorMessage("Failed to place order.");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to place order. Please try again.");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="checkout my-container p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-600">
        Checkout
      </h2>

      {cart.length > 0 && (
        <div className="shipping w-full max-w-md flex flex-col gap-4">
          <h2 className="font-bold text-xl">Shipping Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                First Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                className="py-2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="font-semibold">
                Address
              </label>
              <input
                ref={addressRef}
                type="text"
                id="address"
                className="py-2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition duration-200 hover:bg-blue-700"
              type="button"
              onClick={handleOrder}
            >
              {loading ? "PLACING ORDER..." : "PLACE YOUR ORDER"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
