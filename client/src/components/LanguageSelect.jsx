const LanguageSelect = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-semibold text-gray-400">Language:</span>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
        <select
          className="relative bg-slate-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/30 cursor-pointer font-medium"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">🐍 Python</option>
          <option value="java">☕ Java</option>
          <option value="cpp">⚙️ C++</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelect;
