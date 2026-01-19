import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const OptimizedResult = ({ optimized, language = "python" }) => {
  const [copied, setCopied] = useState(false);

  if (!optimized) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimized.optimized_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-green-500">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-green-400">Optimized Code</h2>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded font-medium transition ${
            copied
              ? "bg-green-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          {copied ? "✓ Copied!" : "📋 Copy Code"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ borderRadius: "8px", marginBottom: "12px" }}
      >
        {optimized.optimized_code}
      </SyntaxHighlighter>

      {(optimized.optimized_time || optimized.optimized_space) && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {optimized.optimized_time && (
            <div className="bg-gray-900 p-3 rounded">
              <p className="text-gray-300 text-xs">Optimized Time</p>
              <p className="text-lg font-bold text-green-300">{optimized.optimized_time}</p>
            </div>
          )}
          {optimized.optimized_space && (
            <div className="bg-gray-900 p-3 rounded">
              <p className="text-gray-300 text-xs">Optimized Space</p>
              <p className="text-lg font-bold text-green-300">{optimized.optimized_space}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptimizedResult;
