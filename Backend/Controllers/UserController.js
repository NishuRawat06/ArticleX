import User from "../Models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import GenerateJwt from "../utils/generateToken.js";
import setCookies from "../utils/cookies.js";
export const Signup = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    if (!user || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      user,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      user: newUser.user,
      email: newUser.email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    // console.log("pasworddd", password);
    // console.log("existing userrr", existingUser.password);
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    // console.log("comapre paswddd", comparePassword);
    if (!comparePassword) {
      return res.status(400).json("wrong credentials");
    }
    const access_token = GenerateJwt({
      data: { id: existingUser._id },
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refresh_token = GenerateJwt({
      data: { id: existingUser._id },
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    await User.updateOne(
      { _id: existingUser._id },
      { refreshToken: refresh_token },
    );
    setCookies({
      res,
      name: "access_token",
      token: access_token,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    setCookies({
      res,
      name: "refresh_token",
      token: refresh_token,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      message: "Authentication successful! Passwords match.",
      userId: existingUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user doesn't found with this email" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 3000,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const token = GenerateJwt({
      data: { id: user._id, email },
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    // console.log("tokennnnn", token);
    const resetLink =
      `${process.env.LOCAL_DOMAIN}/ForgetPassword?token=` + token;
    const mailOptions = {
      from: "nishucallsmaster@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h2>Reset Your Article X Password</h2>
      
      <p>Hello,</p>
      
      <p>
        We received a request to reset the password for your Article X account.
        Click the button below to create a new password.
      </p>

      <a href="${resetLink}" 
         style="display: inline-block; padding: 12px 20px; 
                background-color: #007bff; color: white; 
                text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>

      <p style="margin-top: 20px;">
        This link will expire in 15 minutes. If you didn't request a password reset,
        you can safely ignore this email.
      </p>

      <p>Thanks,<br>The Article X Team</p>
    </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error occurred:", error.message);
      }
      console.log("Email sent successfully! Message ID:", info.messageId);
    });
    return res
      .status(200)
      .json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { token, password } = req.body;
    // console.log("tokennnnnnn", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decodeeeeddd", decoded);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user doesn't found with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (decoded) {
      const newPswd = await User.updateOne(
        { _id: decoded.id },
        { $set: { password: hashedPassword } },
      );
      res.status(200).json({ message: "password changed successfully" });
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userDetail = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const { exp, id } = decoded;
    if (exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Refresh Token expired" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "could not find user with this id " });
    }
    const dbRefreshToken = user.refreshToken;

    if (dbRefreshToken !== refresh_token) {
      return res.status(400).json({
        message: "invalid refresh token",
        dbRefreshToken,
        refresh_token,
      });
    }
    const access_token = GenerateJwt({
      data: { id: user._id },
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    setCookies({
      res,
      name: "access_token",
      token: access_token,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    return res
      .status(200)
      .json({ message: "access token refreshed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (access_token === undefined) {
      return res.status(423).json({ message: "Access token not found" });
    }
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    const { exp, id } = decoded;
    if (exp * 1000 < Date.now()) {
      return res.status(423).json({ message: "Access Token expired" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(423).json({ message: "invalid token " });
    }
    // return res.status(200).json({ message: "token verified" });
    req.userId = id;
    req.userData = { user: user.user, email: user.email };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;

    if (refresh_token) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
    }

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
