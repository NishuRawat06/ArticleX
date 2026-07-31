import express from "express";
import {
  deleteUser,
  forgetPassword,
  logout,
  passwordReset,
  refreshToken,
  Signin,
  Signup,
  userDetail,
  verifyToken,
} from "../Controllers/UserController.js";
const router = express.Router();
router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", passwordReset);
router.get("/refreshToken", refreshToken);
router.get("/verifyToken", verifyToken, (req, res) =>
  res.status(200).json({
    message: "token verified",
    user: req.user
  }),
);
router.get("/logout", logout);
router.get("/getuser/:id", userDetail);
router.delete("/delete/:id", deleteUser);
export default router;
