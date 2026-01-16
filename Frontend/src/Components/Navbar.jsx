import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#F5F0E6] w-full border-b border-[#875D4A] px-5 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="text-[#875D4A] text-3xl sm:text-4xl font-bold font-sans">
          ArticleX
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-[#875D4A]">
          <NavLink to="/" className="font-bold">Home</NavLink>
          <NavLink to="/AddArticle" className="font-bold">Add Article</NavLink>
          <NavLink to="/AllArticles" className="font-bold">All Articles</NavLink>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-[#875D4A] text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 text-[#875D4A]">
          <NavLink to="/" onClick={() => setOpen(false)} className="font-bold">
            Home
          </NavLink>
          <NavLink to="/AddArticle" onClick={() => setOpen(false)} className="font-bold">
            Add Article
          </NavLink>
          <NavLink to="/AllArticles" onClick={() => setOpen(false)} className="font-bold">
            All Articles
          </NavLink>
        </ul>
      )}
    </nav>
  );
}
