import Article from "../Models/Article.js";
import mongoose from "mongoose";
export const addArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
//fetch all articles
export const getallarticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};
//fetch single article
export const getsinglearticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
};
//delete article
export const deletearticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article" });
  }
};
//update article
export const updatearticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update article" });
  }
};
