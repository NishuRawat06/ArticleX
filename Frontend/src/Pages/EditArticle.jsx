import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Author, setAuthor] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/api/articles/${id}`);
        const data = await res.json();
        setTitle(data.title || "");
        setContent(data.body || "");
        setAuthor(data.author || "");
      } catch (err) {
        console.error(err);
        setTitle("");
        setContent("");
        setAuthor("");
      }
    };
    fetchArticle();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API}/api/articles/update/${id}`, {
        title: Title,
        body: Content,
        author: Author, // Keep author same
      });
      alert("Article updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update article");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 relative">



        <h1 className="text-xl sm:text-2xl font-bold text-[#875D4A] text-center">
          Edit Article
        </h1>

        <form className="flex flex-col gap-3 w-full" onSubmit={handleUpdate}>
          {/* Author (display only) */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#343231] mb-1">
               Author
            </label>
            <p className="px-3 py-1.5 rounded-lg border border-[#875D4A]/30 bg-[#f5f0e6] text-[#343231]">{Author}</p>
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#343231] mb-1">
               Title
            </label>
            <input
              type="text"
              className="border border-[#875D4A]/30 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#875D4A]"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#343231] mb-1">
               Content
            </label>
            <textarea
              className="border border-[#875D4A]/30 rounded-lg px-3 py-1.5 min-h-[80px] sm:min-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#875D4A] resize-none"
              value={Content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#875D4A] hover:bg-[#a0755e] text-white font-bold py-2 rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
