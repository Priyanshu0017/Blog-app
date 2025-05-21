import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  let { user } = useSelector((state) => state.auth); // Simulating user state

  const dispatch = useDispatch()

  return (
    <nav className="flex justify-between items-center md:px-8 p-6 py-2 border border-b-1 border-black shadow-sm">
      <Link to={"/"} className="text-2xl font-bold uppercase">
        Blog-App
      </Link>
      <div className="space-x-4 flex items-center">
        {user ? (
          // Show Logout button if user exists
          <button className="px-4 py-2 font-semibold text-sm text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
          onClick={() => {
            dispatch(logoutUser())
          }}>
            Logout
          </button>
        ) : (
          // Show Login and Register buttons if user does not exist
          <>
            <Link
              to={"/login"}
              className="px-4 py-2 font-semibold text-white text-sm bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-4 py-2 font-semibold text-sm text-white bg-green-500 rounded hover:bg-green-600 transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
