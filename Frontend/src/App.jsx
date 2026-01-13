import React from "react";
import Navbar from "./Components/Navbar";
import AddNew from "./Pages/AddNew";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import AllArticle from "./Pages/AllArticle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Pages/Details";
import EditArticle from "./Pages/EditArticle";
export default function App(){
 return(
  <Router>
<div>
<Navbar/>
<Routes>
   <Route path="/" element={<Home />} />
   <Route path="/AddArticle" element={<AddNew />} />
  <Route path="/AllArticles" element={<AllArticle />} />
  <Route path="/Details/:id" element={<Details/>} />
  <Route path="/Edit/:id" element={<EditArticle/>}/>
</Routes>
<Footer/>
</div>
</Router>
 )
}