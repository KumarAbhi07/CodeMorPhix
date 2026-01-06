const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <textarea
        className="relative w-full h-72 p-6 bg-slate-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm backdrop-blur-xl border border-purple-500/20 placeholder-gray-500 resize-none"
        placeholder="✨ Paste your code here and let AI analyze it..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
