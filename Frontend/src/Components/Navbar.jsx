import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar(){
return(
    <div className="flex justify-between items-center bg-[#F5F0E6] w-full min-h-16 px-5 py-5 border-b border-[#875D4A]">
        <div className="text-[#875D4A] text-4xl font-bold w-3/5 px-14 font-sans">
         ArticleX
        </div>
        <div className="w-2/5">
        <ul className="flex gap-32">
           <NavLink to='/'><li className="font-bold">Home</li></NavLink>
           <NavLink to='/AddArticle'><li className="font-bold">Add Article</li></NavLink> 
            <NavLink to='/AllArticles'><li className="font-bold">All Article</li></NavLink>
        </ul>
        </div>
    </div>
)
}