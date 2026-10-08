import React, { useState } from "react";
import { API_URL } from "../API";

const Login = ({ onLogin, onSwitch, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    seterror("");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      seterror("Invalid username or password");
      return;
    }
    onLogin(result.token);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-indigo-500/10 p-6 sm:p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-indigo-500/20">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">Login to your account</p>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username..."
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Password..."
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-3">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <button
          onClick={onSwitch}
          className="mt-6 w-full text-center text-sm text-indigo-400 font-medium transition hover:text-indigo-300 hover:underline"
        >
          No account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;