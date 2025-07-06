import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Use your actual deployed backend URL here
  const BACKEND_URL = "https://your-backend-url.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/business-data`, {
        name: businessName,
        location,
      });
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/regenerate-headline`, {
        params: { name: businessName, location },
      });
      setData((prev) => ({ ...prev, headline: res.data.headline }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Business Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {data && (
          <div className="mt-6 border-t pt-4">
            <div className="mb-2 text-lg font-medium">⭐ {data.rating} / 5.0</div>
            <div className="mb-2 text-gray-600">{data.reviews} reviews</div>
            <div className="mb-4 italic">"{data.headline}"</div>
            <button
              onClick={regenerateHeadline}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
