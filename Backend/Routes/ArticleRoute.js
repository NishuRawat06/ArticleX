import express from "express";
import {
  addArticle,
  getallarticles,
  getsinglearticle,
  deletearticle,
  updatearticle,
} from "../Controllers/ArticleController.js";
import { verifyToken } from "../Controllers/UserController.js";

const router = express.Router();
router.get("/get-all", getallarticles);
router.get("/:id", getsinglearticle);
router.use(verifyToken);
router.post("/", addArticle);
router.put("/update/:id", updatearticle);
router.delete("/:id", deletearticle);

export default router;
