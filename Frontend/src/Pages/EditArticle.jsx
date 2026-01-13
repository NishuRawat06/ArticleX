import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const[Author,setAuthor]=useState("")
  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
    try{const res = await fetch(`http://localhost:5000/api/articles/${id}`);
      const data = await res.json();
      console.log("Fetched article:", data);
      setTitle(data.title|| "");
      setContent(data.body|| "");
      setAuthor(data.author|| "")

    }
    catch (err) {
      console.error(err);
      setTitle(""); // fallback if fetch fails
      setContent("");
      setAuthor("") // fallback if fetch fails
    }
  }
    fetchArticle();
  }, [id]);
  const handleupdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/articles/update/${id}`, {
      title: Title,
      body: Content, 
    author: Author,
    }
  );
  alert("Article updated successfully");
    navigate("/");
  };
  return (
    <form
      className="flex flex-col items-center gap-5 mt-10"
      onSubmit={handleupdate}
    >
      <input
        className="font-bold text-3xl text-[#875D4A]"
        placeholder="Title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="font-bold text-2xl ">{Author}</div>
      <textarea
        className=" text-2xl"
        placeholder="content"
        value={Content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="border-4 bg-[#875D4A] text-white w-40 py-2"
        type="submit"
      >
        save
      </button>
    </form>
  );
}
