import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Summary = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/openai/summary`,
        { text }
      );
      setSummary(data.summary); // ✅ এটা fixed
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-md">
      {error && (
        <div className="mb-4">
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold mb-4">Summarize Text</h1>

        <textarea
          placeholder="Add your text"
          className="w-full p-3 border border-gray-300 rounded resize-none min-h-[150px]"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Submit
        </button>

        <p className="mt-4 text-sm">
          Not this tool?{" "}
          <Link to="/" className="text-blue-600 underline">
            Go back
          </Link>
        </p>
      </form>

      <div className="mt-8 border border-gray-300 rounded-lg min-h-[300px] p-4 overflow-auto bg-gray-50">
        {summary ? (
          <p className="text-gray-800 whitespace-pre-line">{summary}</p>
        ) : (
          <p className="text-center text-gray-500 leading-[300px]">
            Summary Will Appear Here
          </p>
        )}
      </div>
    </div>
  );
};

export default Summary;