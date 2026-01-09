import React from "react";
import { useState } from "react";
import axios from "axios";
export default function AddNew() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [Author, setAuthor] = useState("");
  const handleSubmit = async (e) => {
    console.log(Author, title, body);
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/articles", {
        Author,
        title,
        body,
      });
      alert("Article added");
      setAuthor("");
      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center bg-[#F5F0E6] gap-7">
      <h1 className="font-bold text-3xl text-[#875D4A]">Creating Article</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-2xl font-bold text-[#875D4A]">
            Author Name
          </label>
          <input
            type="text"
            className="border-2"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-2xl font-bold text-[#875D4A]">
            Article Title
          </label>
          <input
            type="text"
            className="border-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-2xl font-bold text-[#875D4A]">
            Article Body
          </label>
          <textarea
            className="border-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button className="border-4 bg-[#875D4A] text-white" type="submit">
          Add Article
        </button>
      </form>
    </div>
  );
}
