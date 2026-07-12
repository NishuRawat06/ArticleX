import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LEFT_COLUMN_IMAGES = [
  "https://picsum.photos/seed/articlex-1/400/520",
  "https://picsum.photos/seed/articlex-2/400/520",
  "https://picsum.photos/seed/articlex-3/400/520",
  "https://picsum.photos/seed/articlex-4/400/520",
];

const RIGHT_COLUMN_IMAGES = [
  "https://picsum.photos/seed/articlex-5/400/520",
  "https://picsum.photos/seed/articlex-6/400/520",
  "https://picsum.photos/seed/articlex-7/400/520",
  "https://picsum.photos/seed/articlex-8/400/520",
];

function ImageColumn({ images, direction = "up", duration = 28 }) {
  const loop = [...images, ...images];
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className={`flex flex-col gap-4 ${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#1B1F29] flex-shrink-0"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover grayscale-[15%] opacity-90"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/articles/get-all`,
        );
        setArticles(res.data.slice(-3).reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      <style>{`
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .animate-scroll-up { animation: scroll-up linear infinite; }
        .animate-scroll-down { animation: scroll-down linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-up, .animate-scroll-down { animation: none; }
        }
      `}</style>

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-stretch">
        <div className="hidden md:block h-[640px] px-6 pt-10">
          <ImageColumn
            images={LEFT_COLUMN_IMAGES}
            direction="up"
            duration={32}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-16">
          <p
            className="text-[#C9A227] text-xs tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Where writers become bylines
          </p>

          <h1
            className="text-[#FBF8F2] uppercase text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-8"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
          >
            Where the
            <br />
            world <span className="text-[#C9A227]">reads on</span>
          </h1>

          <p
            className="text-[#B9B6AC] text-lg mb-10 max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every story starts with someone willing to write it. Publish yours
            and put it in front of readers today.
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button
              onClick={() => navigate("/AddArticle")}
              className="group inline-flex items-center gap-2 bg-[#C9A227] text-[#14171F] px-6 py-3 rounded-md font-medium hover:bg-[#DBB84A] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Start writing
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => navigate("/AllArticles")}
              className="text-[#D8D5CC] text-sm hover:text-[#C9A227] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Browse all articles
            </button>
          </div>

          {!loading && (
            <div
              className="flex items-center gap-2 mt-10 text-[#6E6C64] text-xs tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              {articles.length === 0
                ? "No articles published yet — yours could be first"
                : "Freshly published, straight from the archive"}
            </div>
          )}
        </div>

        <div className="hidden md:block h-[640px] px-6 pt-10">
          <ImageColumn
            images={RIGHT_COLUMN_IMAGES}
            direction="down"
            duration={36}
          />
        </div>
      </div>
    </div>
  );
}
