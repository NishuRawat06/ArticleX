import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFetch } from "../utils/request";
import { useAtom } from "jotai";
import isLoggedIn from "../atoms/loggedIn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPswd, setForgotPswd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [isloggedin, setLoggedin] = useAtom(isLoggedIn);
  const handleforgetpassword = () => {
    setForgotPswd((prev) => !prev);
  };
  //   console.log("forget passwordddddd", forgotPswd);
  const navigate = useNavigate();
  useEffect(() => {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap";

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const url = forgotPswd !== true ? "/auth/Signin" : "/auth/forgetPassword";

      const response = await postFetch(url, {
        email,
        password,
      });
      if (response.status < 400) {
        console.log(response)
        setLoggedin(
          response.data.user
            ? {
                id: response.data.user._id,
                user: response.data.user.user,
                email: response.data.user.email,
              }
            : null,
        );
      }
      setStatus({
        type: "success",
        message:
          forgotPswd !== true
            ? "Login successfull!"
            : "Reset link sent on Email",
      });

      // Clear form
      setEmail("");
      setPassword("");
      navigate("/AddArticle");
    } catch (error) {
      console.log("Signup error:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while performing this operation",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldWrap = "relative";

  const fieldUnderlineBase =
    "border-b border-[#8B8578]/30 group-focus-within:border-[#8B8578]/0";

  const fieldUnderlineGrow =
    "absolute left-0 -bottom-[1px] h-[1.5px] w-0 bg-[#C9A227] transition-all duration-300 group-focus-within:w-full";

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Heading */}
        <h1
          className="text-[#FBF8F2] text-3xl sm:text-4xl mb-8"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
          }}
        >
          <span className="italic text-[#C9A227]">Login</span>
        </h1>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 bg-[#0B0D12] border border-[#FBF8F2]/10 rounded-xl p-6 sm:p-8 shadow-2xl shadow-black/60"
        >
          {/* Email */}
          <div className={`${fieldWrap} group flex flex-col gap-2`}>
            <label
              className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] text-lg px-1 py-2 focus:outline-none transition-colors placeholder:text-[#6E6C64]`}
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <span className={fieldUnderlineGrow} />
          </div>

          {/* Password */}
          {forgotPswd !== true ? (
            <div className={`${fieldWrap} group flex flex-col gap-2`}>
              <label
                className="text-[#C9A227] text-xs tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className={`bg-transparent ${fieldUnderlineBase} text-[#FBF8F2] text-lg px-1 py-2 focus:outline-none transition-colors placeholder:text-[#6E6C64]`}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              <span className={fieldUnderlineGrow} />
            </div>
          ) : (
            ""
          )}

          {/* Status Message */}
          {status && (
            <p
              className={`text-sm -mt-2 ${
                status.type === "success" ? "text-[#C9A227]" : "text-[#E08B7D]"
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
              role="status"
            >
              {status.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#14171F] font-medium py-3 rounded-md hover:bg-[#DBB84A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {submitting && (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#14171F]/40 border-t-[#14171F] animate-spin" />
            )}
            {forgotPswd !== true
              ? submitting
                ? "Signing in..."
                : "Log in"
              : "Verify Email"}

            {!submitting && (
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </button>

          {/* Login Link */}
          <button
            className="text-center text-sm text-[#8B8578]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
            onClick={handleforgetpassword}
          >
            {forgotPswd !== true ? "Forget password?" : "cancel"}
            {/* <Link
              to="/login"
              className="text-[#C9A227] hover:text-[#DBB84A] transition-colors"
            >
              Login
            </Link> */}
          </button>
        </form>
      </div>
    </div>
  );
}
