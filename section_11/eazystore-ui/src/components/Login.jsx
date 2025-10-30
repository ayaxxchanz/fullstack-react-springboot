import React from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router";

export default function Login() {
  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-lighter mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light outline-none focus:ring focus:ring-secondary focus:border-secondary bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-light-2 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        {/* Title */}
        <PageTitle title="Login" />
        {/* Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-2 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-xl rounded-md transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary dark:text-dark hover:text-gray-600 dark:hover:text-secondary transition duration-200 underline underline-offset-6 decoration-3"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}