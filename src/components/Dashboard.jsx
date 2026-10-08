import React, { useEffect, useState } from "react";
import { DATA_URL } from "../API";

const Dashboard = ({ token, onLogout }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch(DATA_URL, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 401) {
        onLogout();
        return;
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    getData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <div className="h-12 w-12 rounded-full border-4 border-gray-700 border-t-indigo-500 animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-400">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar: scroll karne par bhi upar chipka rehta hai */}
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

      {/* Cards: mobile 1, tablet 2, desktop 3 columns */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
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
                Age: <span className="font-semibold text-gray-200">{p.age}</span>
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
      </main>
    </div>
  );
};

export default Dashboard;