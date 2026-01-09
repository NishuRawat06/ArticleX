import React from "react";
import homeimg from "../assets/homeimg.jpg";

export default function Home() {
  return (
    <div className="w-full px-6 py-12 bg-[#F5F0E6]">
      
      <div className="relative w-full">
        {/* Image */}
        <img
          src={homeimg}
          alt="Home"
          className="w-full h-100 object-cover rounded-lg"
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 bg-black/40 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            ArticleX is a trending article writing app
          </h1>

          <p className="text-white mb-6 max-w-md">
            Anyone can publish their article on our website.
          </p>

          <button className="px-6 py-3 bg-white text-black rounded-md">
            Start Now
          </button>
        </div>
      </div>

    </div>
  );
}
