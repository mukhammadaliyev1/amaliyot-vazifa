import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderLayout({ children }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault(); 
    navigate("/"); 
  }

  return (
    <div>
      <header className="w-full bg-base-200">
        <div className="container bg-base-200 py-2 text-neutral-content display flex gap-5 justify-end px-20 mx-auto">
          <Link to={"/login"}>Sign in</Link>
          <Link to={"/register"}>Create account</Link>
        </div>

        <div className=" bg-slate-100 w-full py-2 px-32 flex justify-between">
          <button
            onClick={handleClick}
            className="btn btn-info bg-blue-600 text-white text-2xl"
          >
            C
          </button>
        


    <div className=" flex gap-5  ">
<Link className="text-xl  hover:bg-slate-700 p-2 py-2 rounded-md   transition-all 0.7  text-gray-600  " to={'/'}>Home</Link>
<Link className="text-xl  hover:bg-slate-700 p-2 py-2 rounded-md  transition-all 0.7  text-gray-600  " to={'/about'}>About</Link>
<Link className="text-xl  hover:bg-slate-700 p-2 py-2 rounded-md transition-all 0.7   text-gray-600 " to={'/products'}>Products</Link>
<Link className="text-xl hover:bg-slate-700 p-2 py-2 rounded-md   transition-all 0.7 text-gray-600 " to={'/cart'}>Cart</Link>

    </div>

<div className="flex  gap-8">
 <p>theme</p>
 <p>shop
 </p>
</div>



        </div>
      </header>
      {children}
    </div>
  );
}

export default HeaderLayout;
