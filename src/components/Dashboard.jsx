import React, { useEffect, useState } from "react";
import { DATA_URL } from "../API";

const Dashboard = ({ token, onLogout }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const authHeaders = {
    Authorization: `Token ${token}`,
  };

  // GET: data lao
  const getData = async () => {
    try {
      const response = await fetch(DATA_URL, { headers: authHeaders });
      if (response.status === 401) {
        onLogout();
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Could not load data. Is the server running?");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    };
    loadData();
  }, [token]);

  // POST: naya record bhejo
  const addHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(DATA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify({ name, age: Number(age), hobby }),
      });

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok) {
        setError("Enter valid data");
        return;
      }

      // Form saaf karo aur list dobara load karo
      setName("");
      setAge("");
      setHobby("");
      await getData();
    } catch (err) {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <div className="h-12 w-12 rounded-full border-4 border-gray-700 border-t-indigo-500 animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-400">Loading...</h2>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur border-b border-gray-800 shadow-lg shadow-black/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-400">
            Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm sm:text-base font-semibold transition duration-200 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Add form */}
        <form
          onSubmit={addHandler}
          className="mb-8 bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-md shadow-black/30"
        >
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Add New Record
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name..."
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age..."
              min="0"
              className={inputClass}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Hobby..."
              className={inputClass}
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Adding..." : "Add"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
              {error}
            </p>
          )}
        </form>

        {/* Cards: mobile 1, tablet 2, desktop 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.map((p) => (
            <div
              key={p.id}
              className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-md shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <h1 className="text-xl font-bold text-gray-100 truncate">
                {p.name}
              </h1>
              <p className="mt-2 text-gray-400">
                Age:{" "}
                <span className="font-semibold text-gray-200">{p.age}</span>
              </p>
              <p className="text-gray-400">
                Hobby:{" "}
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-sm font-medium">
                  {p.hobby}
                </span>
              </p>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No records yet. Add one above.
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;