import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/AddArticle", label: "Write" },
  { to: "/AllArticles", label: "Articles" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap";

    document.head.appendChild(link);

    return () => document.head.removeChild(link);
  }, []);

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

        <ul
          className="hidden md:flex items-center gap-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {navLinks.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === "/"} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-[2px] bg-[#C9A227] transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#C9A227] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#C9A227] transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

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
              <li key={item.to}>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
