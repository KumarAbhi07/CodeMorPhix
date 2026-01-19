const ResultPanel = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg text-white space-y-3 border border-blue-500">
      <h2 className="text-xl font-semibold text-blue-400">Complexity Analysis</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded">
          <p className="text-gray-300 text-sm">Time Complexity</p>
          <p className="text-2xl font-bold text-blue-300">{result.time}</p>
        </div>
        <div className="bg-gray-900 p-3 rounded">
          <p className="text-gray-300 text-sm">Space Complexity</p>
          <p className="text-2xl font-bold text-purple-300">{result.space}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
