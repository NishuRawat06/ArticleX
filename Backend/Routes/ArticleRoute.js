import express from "express";
import {
  addArticle,
  getallarticles,
  getsinglearticle,
  deletearticle,
  updatearticle,
} from "../Controllers/ArticleController.js";

const router = express.Router();

router.post("/", addArticle);
router.get("/get-all", getallarticles);
router.get("/:id", getsinglearticle);
router.put("/update/:id", updatearticle);
router.delete("/:id", deletearticle);

export default router;
