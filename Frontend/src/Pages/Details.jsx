import React from "react";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import EditArticle from "./EditArticle";
export default function Details(){
     const { id } = useParams(); 
     const navigate=useNavigate();
    const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);
  if (!article) {
    return <p className="text-center mt-10">Loading...</p>;
  }
const handleDelete = () => {
  fetch(`http://localhost:5000/api/articles/${id}`, {
    method: "DELETE",
  })
     .then(res => {
      if (!res.ok) {
        throw new Error("Delete failed: route not found");
      }
      return res.json();
    })
    .then(data => {
      alert(data.message);
      navigate("/"); 
    })
    .catch(err => console.error(err.message));
};
    return(
      <div className="flex flex-col items-center gap-5 mt-10">
      
      <h1 className="font-bold text-3xl text-[#875D4A]">
        {article.title}
      </h1>

      <h2 className="font-semibold text-xl text-[#343231]">
        written by {article.Author}
      </h2>

      <p className="text-lg text-[#161615] mx-10 text-center">
        {article.body}
      </p>

      <button 
      onClick={handleDelete}
      className="border-4 bg-[#875D4A] text-white w-40 py-2">
        delete
      </button>
       <button 
       onClick={() => navigate(`/edit/${article._id}`)}
      className="border-4 bg-[#875D4A] text-white w-40 py-2 mb-5">
        Update
      </button>
    </div>
    )
}