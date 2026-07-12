import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/AddArticle", label: "Write" },
  { to: "/AllArticles", label: "Articles" },
];

export default function Footer() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <footer className="w-full bg-black border-t border-[#FBF8F2]/10">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 md:gap-10">
          <div>
            <h2
              className="text-[#FBF8F2] text-2xl mb-3 tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Article<span className="text-[#C9A227]">X</span>
            </h2>

            <p
              className="text-[#8B8578] text-sm max-w-xs leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A modern platform where anyone can write and publish articles.
              Every voice gets a front page.
            </p>
          </div>
          <div>
            <h3
              className="text-[#C9A227] text-xs tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Quick Links
            </h3>

            <ul
              className="space-y-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#D8D5CC] text-sm hover:text-[#C9A227] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="text-[#C9A227] text-xs tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Get in Touch
            </h3>

            <a
              href="mailto:support@articlex.com"
              className="block text-[#D8D5CC] text-sm hover:text-[#C9A227] transition-colors mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              support@articlex.com
            </a>

            <p
              className="text-[#8B8578] text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} ArticleX
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#FBF8F2]/10 mt-12 pt-6">
          <p
            className="text-[#6E6C64] text-xs tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Set in Fraunces &amp; Inter — published digitally, everywhere.
          </p>

          <p
            className="text-[#6E6C64] text-xs tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Made with care by the ArticleX team
          </p>
        </div>
      </div>
    </footer>
  );
}
