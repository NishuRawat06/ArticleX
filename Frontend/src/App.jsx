import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import AddNew from "./Pages/AddNew";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import AllArticle from "./Pages/AllArticle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Pages/Details";
import EditArticle from "./Pages/EditArticle";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetPassword";

import { useAtom } from "jotai";
import isLoggedIn from "./atoms/loggedIn";
import Fetch from "./utils/request";
export default function App() {
  const [state, setState] = useState("ready");
  const [isloggedin, setLoggedin] = useAtom(isLoggedIn);
  async function verifyToken() {
    setState("loading");
    const res = await Fetch("/auth/verifyToken");
    if (res.status > 399) {
      console.log(res)
      setLoggedin({
        id: res.data.user._id,
        user: res.data.user.user,
        email: res.data.user.email,
      });
    }
    setState("ready");
  }
  useEffect(() => {
    if (!isloggedin) {
      verifyToken();
    }
  }, [isloggedin]);
  if (state === "loading") return <p>loading</p>;
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddArticle" element={<AddNew />} />
          <Route path="/AllArticles" element={<AllArticle />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/Edit/:id" element={<EditArticle />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
