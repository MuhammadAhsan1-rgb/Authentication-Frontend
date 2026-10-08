import React, { useState } from "react";
import { REGISTER_URL } from "../API";
const Register = ({ onRegistered, onSwitch }) => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const regsiterHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError("Enter valid data");
      return;
    }
    onRegistered();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 sm:p-8 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-purple-500/20">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Register to get started
        </p>

        <form onSubmit={regsiterHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username..."
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Enter Email..."
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Passoword..."
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold transition duration-200 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <button
          onClick={onSwitch}
          className="mt-6 w-full text-center text-sm text-purple-400 font-medium transition hover:text-purple-300 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;