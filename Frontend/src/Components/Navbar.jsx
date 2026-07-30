import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import isLoggedIn from "../atoms/loggedIn";
import Fetch from "../utils/request";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/AllArticles", label: "Articles" },
  { to: "/AddArticle", label: "Write" },
  { to: "/Signup", label: "Signup" },
  { to: "/Login", label: "Login" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
   const [isloggedin, setLoggedin] = useAtom(isLoggedIn);
  const loggedInUser = useAtomValue(isLoggedIn);

  const profileRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap";

    document.head.appendChild(link);

    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
  try {
    const res = await Fetch("/auth/logout");
     setLoggedin(null);
    navigate("/login");

  } catch (error) {
    console.log(error);
  }
  };
  
  function display(label) {
    if (["Login", "Signup"].includes(label) && loggedInUser) {
      return "none";
    }

    if (label === "Write" && !loggedInUser) {
      return "none";
    }

    return "inherit";
  }

  const linkClass = ({ isActive }) =>
    `relative uppercase text-[13px] tracking-[0.22em] transition-all duration-300 ${
      isActive ? "text-[#C9A227]" : "text-[#D8D5CC] hover:text-[#FBF8F2]"
    }
    after:absolute after:left-0 after:-bottom-2
    after:h-[2px]
    after:bg-[#C9A227]
    after:transition-all
    after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-[#C9A227]/20 shadow-md">
      <div className="max-w-7xl mx-auto h-20 px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl text-[#FBF8F2] select-none"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
          }}
        >
          Article<span className="text-[#C9A227]">X</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul
            className="flex items-center gap-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {navLinks.map((item) => (
              <li
                key={item.to}
                style={{
                  display: display(item.label),
                }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={linkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Profile */}
          {loggedInUser && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-[#C9A227] text-black font-semibold flex items-center justify-center"
              >
                {loggedInUser.user?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-64 bg-[#111111] border border-[#C9A227]/30 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-4">
                    <p className="text-[#FBF8F2] font-semibold">
                      {loggedInUser.user}
                    </p>

                    <p className="text-[#A8A49A] text-sm mt-1">
                      {loggedInUser.email}
                    </p>
                  </div>

                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 border-t border-[#C9A227]/20 text-red-400 hover:bg-red-500/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#C9A227] transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />

          <span
            className={`w-6 h-0.5 bg-[#C9A227] transition-all ${
              open ? "opacity-0" : ""
            }`}
          />

          <span
            className={`w-6 h-0.5 bg-[#C9A227] transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5">
          <ul
            className="rounded-xl bg-[#111111] border border-[#C9A227]/20 p-6 flex flex-col gap-6 shadow-xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {navLinks.map((item) => (
              <li
                key={item.to}
                style={{
                  display: display(item.label),
                }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {loggedInUser && (
              <li className="border-t border-[#C9A227]/20 pt-5">
                <p className="text-[#FBF8F2] font-semibold">
                  {loggedInUser.user}
                </p>

                <p className="text-[#A8A49A] text-sm">{loggedInUser.email}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
