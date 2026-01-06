import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import LanguageSelect from "./components/LanguageSelect";
import ResultPanel from "./components/ResultPanel";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please enter code");
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        code,
        language,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Error analyzing code. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              AI-Powered Code Analysis
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Detect time & space complexity, find bottlenecks, and get optimized code suggestions powered by AI
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">3</p>
              <p className="text-sm text-gray-500">Languages</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">AI</p>
              <p className="text-sm text-gray-500">Powered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">∞</p>
              <p className="text-sm text-gray-500">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <LanguageSelect language={language} setLanguage={setLanguage} />

          <CodeEditor code={code} setCode={setCode} />

          <button
            onClick={handleAnalyze}
            disabled={loading || !code.trim()}
            className="relative group w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300 group-disabled:opacity-30"></div>
            <div className="relative px-8 py-3 bg-slate-950 rounded-xl font-bold text-lg">
              {loading ? "🔍 Analyzing..." : "⚡ Analyze Code"}
            </div>
          </button>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          <ResultPanel result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
