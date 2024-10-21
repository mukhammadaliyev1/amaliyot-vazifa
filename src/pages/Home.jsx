// import React, { useEffect, useState } from "react";
// import { http } from "../axios";

// function Home() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     http
//       .get("products?featured=true")
//       .then((data) => {
//         if (data.status === 200) {
//           setProducts(data.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div>
//       <div className=" container mx-auto   mt-16 flex items-center gap-24 ">
//         <div className="mx-10">
//           <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-blue-950">
//             {" "}
//             We are changing the way people shop{" "}
//           </h1>
//           <p className="mt-8 max-w-xl text-lg leading-8">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
//             repellat explicabo enim soluta temporibus asperiores aut obcaecati
//             perferendis porro nobis.
//           </p>
//           <button
//             className="btn btn-primary text-xl text-white mt-10
// "
//           >
//             Our Products
//           </button>
//         </div>

//         <div className="carusel">
//           <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
//             <div className="carousel-item ">
//               <img
//                 src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
//                 className="rounded-box w-[300px] h-[400px]"
//               />
//             </div>
//             <div className="carousel-item">
//               <img
//                 src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
//                 className="rounded-box w-[300px] h-[400px]"
//               />
//             </div>
//             <div className="carousel-item">
//               <img
//                 src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
//                 className="rounded-box w-[300px] h-[400px] object-cover"
//               />
//             </div>
//             <div className="carousel-item">
//               <img
//                 src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
//                 className="rounded-box w-[300px] h-[400px] object-cover "
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=" container mx-auto mt-2">
//         <h1 className="text-3xl font-medium tracking-wider capitalize text-blue-950 mx-10 border-b border-slate-300 pb-5">
//           Featured Products
//         </h1>
//       </div>

//       {products.length > 0 &&
//         products.map(function (product) {
//           return (
//             <div className="flex flex-row flex-wrap">
//               <div className="card cursor-pointer w-80 h-80 bg-white p-4 shadow-xl hover:shadow-2xl transition duration-300 m-2">
//                 <figure className="px-4 pt-4">
//                   <img
//                     src={product.attributes.image}
//                     alt="Shoes"
//                     width={360}
//                     className="rounded-xl"
//                   />
//                 </figure>
//                 <div className="card-body items-center text-center">
//                   <h2 className="card-title">{product.attributes.title}</h2>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    http
      .get("products?featured=true")
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
      <div className="container mx-auto mt-16 flex items-center gap-24">
        <div className="mx-10">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-blue-950">
            We are changing the way people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button
            
            className="btn btn-primary text-xl text-white mt-10"
          >
            Our Products
          </button>
        </div>

        <div className="carousel">
          <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
            <div className="carousel-item">
              <img
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
                className="rounded-box w-[300px] h-[400px]"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
                className="rounded-box w-[300px] h-[400px]"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
                className="rounded-box w-[300px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
                className="rounded-box w-[300px] h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-2">
        <h1 className="text-3xl font-medium tracking-wider capitalize text-blue-950 mx-10 border-b border-slate-300 pb-5">
          Featured Products
        </h1>
      </div>

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

export default Home;
