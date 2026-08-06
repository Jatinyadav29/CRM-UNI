import { Box, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex bg-purple-600 mb-5 text-white font-sans px-5 py-3 justify-between items-center transition duration-200 ease-in-out">
      <div>Logo</div>
      <div className="flex gap-5">
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-medium text-white" : "text-white/60"
          }
          to={"/main"}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-medium text-white" : "text-white/60"
          }
          to={"/main/product"}
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-medium text-white" : "text-white/60"
          }
          to={"/main/about"}
        >
          About
        </NavLink>
      </div>
      <div className="flex gap-5 items-center">
        <NavLink to={"/main/cart"}>
          <ShoppingCartIcon />
        </NavLink>
        <NavLink to={"/main/orders"}>
          <Box />
        </NavLink>
        <button className="px-4 py-1 bg-white rounded-full text-black">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
