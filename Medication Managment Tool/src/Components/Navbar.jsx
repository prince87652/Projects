import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Authentication/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../Authentication/Firebase";
import navLogo from "/src/assets/LogoNav.avif";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@mui/material";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userName = user?.name || user?.displayName || "User";
  const isLoggedIn = isAuthenticated;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const navList = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "History", href: "/history" },
    { name: "Schedule", href: "/schedule" },
    { name: "Profile", href: "/profile" },
    { name: "Help", href: "/help" },
    {name:'Add Prescription',href:'AddPrescription'}
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="  max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <img
            src={navLogo}
            alt=""
            className="h-12 w-auto transform scale-150 object-contain"
          />
          <span className="text-xl font-bold text-blue-600 tracking-wide">
            MediTrack
          </span>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navList.map((list) => (
            <Link
              key={list.name}
              to={list.href}
              className="text-gray-900 hover:text-blue-600 transition font-medium pb-1 border-b-2 border-transparent hover:border-blue-600 "
            >
              {list.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="text-green-600 font-medium">👤 {userName}</div>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FiX size={28} className="text-blue-600" />
            ) : (
              <FiMenu size={28} className="text-blue-600" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col gap-4 bg-white px-6 py-4 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {isLoggedIn ? (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="self-start"
          >
            Logout
          </Button>
        ) : (
          <Link
            to="/login"
            onClick={closeMenu}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition self-start"
          >
            Login
          </Link>
        )}
        {navList.map((list) => (
          <Link
            key={list.name}
            to={list.href}
            onClick={closeMenu}
            className="text-gray-900 hover:text-blue-600 transition font-medium pb-1 border-b-2 border-transparent hover:border-blue-600 self-start"
          >
            {list.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
