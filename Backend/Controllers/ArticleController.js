import Article from "../Models/Article.js";
import mongoose from "mongoose";
import User from "../Models/User.js";
export const addArticle = async (req, res) => {
  try {
    const id = req.userId;
    const { user } = await User.findById(id);
    const article = await Article({ ...req.body, Author: user, Author_id: id });

    console.log("articleeee dataaaaaa", article);
    await article.save();

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getallarticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};
export const getsinglearticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
};
export const deletearticle = async (req, res) => {
  try {
    const userId = req.userId;
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      Author_id: userId,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article" });
  }
};
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
