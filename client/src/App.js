import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import LanguageSelect from "./components/LanguageSelect";
import ResultPanel from "./components/ResultPanel";
import OptimizedResult from "./components/OptimizedResult";


function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [optimized, setOptimized] = useState(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please enter some code.");
      return;
    }

    // Language detection
    const detectLanguage = (code) => {
      const hasJavaKeywords = /\b(public|private|protected|class|static|void)\b/.test(code);
      const hasCppKeywords = /\b(#include|std::|cout|cin|namespace)\b/.test(code);
      const hasPythonKeywords = /\b(def|import|from|elif)\b/.test(code);
      const hasSemicolons = /;/.test(code);
      const hasBraces = /\{|\}/.test(code);
      
      if (hasCppKeywords) return 'cpp';
      if (hasJavaKeywords && hasSemicolons && hasBraces) return 'java';
      if (hasPythonKeywords || (!hasSemicolons && !hasBraces)) return 'python';
      return null;
    };

    const detectedLang = detectLanguage(code);
    if (detectedLang && detectedLang !== language) {
      const langNames = { python: 'Python', java: 'Java', cpp: 'C++' };
      const errorMsg = `Code appears to be ${langNames[detectedLang]}, but you selected ${langNames[language]}. Please match the language.`;
      setError(errorMsg);
      alert(errorMsg);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setOptimized(null);

    try {
      const analysisRes = await axios.post("http://localhost:5000/analyze", {
        code,
        language,
      });

      setResult(analysisRes.data);

      const aiRes = await axios.post("http://localhost:5000/optimize", {
        code,
        language,
        ...analysisRes.data,
      });

      setOptimized(aiRes.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check backend logs.");
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
              Detect time & space complexity, find bottlenecks, and get
              optimized code suggestions powered by AI
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
        <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-xl shadow-lg space-y-6 border border-gray-800">
          <LanguageSelect language={language} setLanguage={setLanguage} />

          <CodeEditor code={code} setCode={setCode} />

          <button
            onClick={handleAnalyze}
            disabled={loading || !code.trim()}
            className={`w-full px-8 py-3 rounded-lg font-bold text-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "🔍 Analyzing..." : "⚡ Analyze Code"}
          </button>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          <ResultPanel result={result} />
          <OptimizedResult optimized={optimized} language={language} />

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 pb-6 text-sm">
        Built with ❤️ by Abhimanyu | CodeMorphix
      </footer>
    </div>
  );
}

export default App;
