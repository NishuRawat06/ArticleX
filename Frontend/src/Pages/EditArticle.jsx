import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/api/articles/${id}`,
        );
        const data = await res.json();
        setTitle(data.title || "");
        setContent(data.body || "");
        setAuthor(data.Author || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await axios.put(`${import.meta.env.VITE_API}/api/articles/update/${id}`, {
        title,
        body: content,
        Author: author,
      });
      setStatus({ type: "success", message: "Saved — taking you back..." });
      setTimeout(() => navigate(`/Details/${id}`), 600);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Couldn't save changes. Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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

  const fieldUnderlineBase =
    "border-b border-[#8B8578]/30 group-focus-within:border-[#8B8578]/0";
  const fieldUnderlineGrow =
    "absolute left-0 -bottom-[1px] h-[1.5px] w-0 bg-[#C9A227] transition-all duration-300 group-focus-within:w-full";

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-xl">
        <p
          className="text-[#C9A227] text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Editing
        </p>

        <h1
          className="text-[#FBF8F2] text-3xl sm:text-4xl mb-8 text-center"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          Edit <span className="italic text-[#C9A227]">article</span>
        </h1>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-7 bg-[#0B0D12] border border-[#FBF8F2]/10 rounded-xl p-6 sm:p-8 shadow-2xl shadow-black/60"
        >
          <div className="relative group flex flex-col gap-2">
            <label
              className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Byline
            </label>
            <input
              type="text"
              className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] px-1 py-2 focus:outline-none transition-colors`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <span className={fieldUnderlineGrow} />
          </div>
          <div className="relative group flex flex-col gap-2">
            <label
              className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Headline
            </label>
            <input
              type="text"
              className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] text-lg px-1 py-2 focus:outline-none transition-colors`}
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span className={fieldUnderlineGrow} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Body
              </label>
              <span
                className="text-[#6E6C64] text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            </div>
            <textarea
              className="bg-transparent border border-[#8B8578]/25 rounded-md text-[#FBF8F2] px-3 py-3 min-h-[200px] focus:outline-none focus:border-[#C9A227] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.12)] transition-all resize-none"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          {status && (
            <p
              className={`text-sm -mt-2 ${
                status.type === "success" ? "text-[#C9A227]" : "text-[#E08B7D]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              role="status"
            >
              {status.message}
            </p>
          )}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/Details/${id}`)}
              className="flex-1 text-[#D8D5CC] text-sm border border-[#FBF8F2]/15 rounded-md hover:border-[#C9A227]/50 hover:text-[#C9A227] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#14171F] font-medium py-3 rounded-md hover:bg-[#DBB84A] transition-colors disabled:opacity-60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {saving && (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#14171F]/40 border-t-[#14171F] animate-spin" />
              )}
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
