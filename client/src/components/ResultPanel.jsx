const ResultPanel = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">✨ Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Complexity Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-blue-900/20 p-6 rounded-xl border border-blue-500/30 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">⏱️ Time Complexity</p>
            <p className="text-3xl font-bold text-blue-300">{result.time}</p>
          </div>
        </div>

        {/* Space Complexity Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-purple-900/20 p-6 rounded-xl border border-purple-500/30 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">💾 Space Complexity</p>
            <p className="text-3xl font-bold text-purple-300">{result.space}</p>
          </div>
        </div>
      </div>

      {/* Issues Section */}
      <div className="relative group mt-6">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-gradient-to-br from-slate-900 to-red-900/20 p-6 rounded-xl border border-orange-500/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-widest text-orange-400 font-semibold mb-4">⚠️ Potential Issues</p>
          <div className="space-y-2">
            {result.issues.map((issue, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-gray-300">
                <span className="text-orange-400 font-bold mt-0.5">•</span>
                <span className="text-sm">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
