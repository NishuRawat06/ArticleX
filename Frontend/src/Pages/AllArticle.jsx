import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllArticle() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/articles/get-all`,
        );
        setArticles(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-black px-6 md:px-12 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p
              className="text-[#C9A227] text-xs tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              The archive
            </p>
            <h1
              className="text-[#FBF8F2] text-3xl sm:text-4xl"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              All articles
            </h1>
          </div>

          {!loading && articles.length > 0 && (
            <span
              className="text-[#6E6C64] text-xs tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {articles.length} published
            </span>
          )}
        </div>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#FBF8F2]/10 p-5 h-32 animate-pulse bg-[#0B0D12]"
              />
            ))}
          </div>
        )}
        {!loading && articles.length === 0 && (
          <div className="border border-[#FBF8F2]/10 rounded-lg p-12 text-center bg-[#0B0D12]">
            <p
              className="text-[#FBF8F2] text-xl mb-2"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              No articles yet
            </p>
            <p
              className="text-[#8B8578] text-sm mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Be the first to publish something worth reading.
            </p>
            <button
              onClick={() => navigate("/AddArticle")}
              className="inline-flex items-center gap-2 bg-[#C9A227] text-[#14171F] px-5 py-2.5 rounded-md font-medium hover:bg-[#DBB84A] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Write an article →
            </button>
          </div>
        )}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => (
              <div
                key={article._id}
                onClick={() => navigate(`/Details/${article._id}`)}
                className="group cursor-pointer bg-[#0B0D12] border border-[#FBF8F2]/10 rounded-lg p-5 hover:border-[#C9A227]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    className="text-[#6E6C64] text-xs pt-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#6E6C64] text-sm group-hover:translate-x-1 group-hover:text-[#C9A227] transition-all">
                    →
                  </span>
                </div>

                <h3
                  className="text-[#FBF8F2] text-lg leading-snug line-clamp-2 group-hover:text-[#C9A227] transition-colors mb-4"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                >
                  {article.title}
                </h3>

                <span
                  className="text-[#C9A227] text-xs tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {article.Author}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
