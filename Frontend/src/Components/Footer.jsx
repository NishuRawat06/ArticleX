import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#A09B82] text-[#875D4A] ">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#F5F0E6]">
              ArticleX
            </h2>
            <p className="text-sm text-[#F5F0E6]">
              A modern platform where anyone can write and publish articles.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Write</li>
              <li className="hover:text-white cursor-pointer">Articles</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Get in Touch
            </h3>
            <p className="text-sm text-[#F5F0E6]">
              Email: support@articlex.com
            </p>
            <p className="text-sm text-[#F5F0E6]">
              © {new Date().getFullYear()} ArticleX
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-[#F5F0E6]">
          Built with ❤️ by ArticleX Team
        </div>

      </div>
    </footer>
  );
}
