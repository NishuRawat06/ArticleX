import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddNew() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const wordCount = body.trim() === "" ? 0 : body.trim().split(/\s+/).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await axios.post(`${import.meta.env.VITE_API}/api/articles`, {
        Author: author,
        title,
        body,
      });
      setStatus({ type: "success", message: "Published — it's live now." });
      setAuthor("");
      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: "Couldn't publish. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const fieldWrap = "relative";
  const fieldUnderlineBase =
    "border-b border-[#8B8578]/30 group-focus-within:border-[#8B8578]/0";
  const fieldUnderlineGrow =
    "absolute left-0 -bottom-[1px] h-[1.5px] w-0 bg-[#C9A227] transition-all duration-300 group-focus-within:w-full";

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1
          className="text-[#FBF8F2] text-3xl sm:text-4xl mb-8"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          Write your <span className="italic text-[#C9A227]">article</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 bg-[#0B0D12] border border-[#FBF8F2]/10 rounded-xl p-6 sm:p-8 shadow-2xl shadow-black/60"
        >
          <div className={`${fieldWrap} group flex flex-col gap-2`}>
            <label
              className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Byline
            </label>
            <input
              type="text"
              placeholder="Your name"
              className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] px-1 py-2 focus:outline-none transition-colors placeholder:text-[#6E6C64]`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <span className={fieldUnderlineGrow} />
          </div>
          <div className={`${fieldWrap} group flex flex-col gap-2`}>
            <label
              className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Headline
            </label>
            <input
              type="text"
              placeholder="Give it a strong title"
              className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] text-lg px-1 py-2 focus:outline-none transition-colors placeholder:text-[#6E6C64]`}
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
              placeholder="Start writing..."
              className="bg-transparent border border-[#8B8578]/25 rounded-md text-[#FBF8F2] px-3 py-3 min-h-[220px] focus:outline-none focus:border-[#C9A227] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.12)] transition-all resize-none placeholder:text-[#6E6C64]"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
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

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#14171F] font-medium py-3 rounded-md hover:bg-[#DBB84A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {submitting && (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#14171F]/40 border-t-[#14171F] animate-spin" />
            )}
            {submitting ? "Publishing..." : "Publish article"}
            {!submitting && (
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
