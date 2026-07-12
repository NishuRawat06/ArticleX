import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Delete this article? This can't be undone.")) return;

    setDeleting(true);
    fetch(`${import.meta.env.VITE_API}/api/articles/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed: route not found");
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
        setDeleting(false);
      });
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p
          className="text-[#8B8578] text-sm tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Loading article...
        </p>
      </div>
    );
  }
  const paragraphs = article.body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const wordCount = article.body.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="min-h-screen bg-black px-6 py-14">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/AllArticles")}
          className="flex items-center gap-2 text-[#8B8578] text-sm hover:text-[#C9A227] transition-colors mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← Back to all articles
        </button>
        <div className="flex items-center gap-3 mb-4">
          <p
            className="text-[#C9A227] text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Written by {article.Author}
          </p>
          <span className="w-1 h-1 rounded-full bg-[#6E6C64]" />
          <p
            className="text-[#6E6C64] text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {readingTime} min read
          </p>
        </div>
        <h1
          className="text-[#FBF8F2] text-3xl sm:text-4xl leading-[1.15] mb-10"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          {article.title}
        </h1>

        <div className="w-12 h-[2px] bg-[#C9A227] mb-10" />
        <div
          className="text-[#D8D5CC] text-[18px] leading-[1.85]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {paragraphs.map((para, i) =>
            i === 0 ? (
              <p key={i} className="mb-6">
                <span
                  className="float-left text-[#C9A227] text-[64px] leading-[48px] pr-3 pt-1"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                  {para.charAt(0)}
                </span>
                {para.slice(1)}
              </p>
            ) : (
              <p key={i} className="mb-6">
                {para}
              </p>
            ),
          )}
        </div>
        <div className="flex items-center gap-6 mt-14 pt-6 border-t border-[#FBF8F2]/10">
          <button
            onClick={() => navigate(`/edit/${article._id}`)}
            className="text-[#D8D5CC] text-sm hover:text-[#C9A227] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Edit article
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-[#B4432F] text-sm hover:text-[#D9573D] transition-colors disabled:opacity-50"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {deleting ? "Deleting..." : "Delete article"}
          </button>
        </div>
      </div>
    </div>
  );
}
