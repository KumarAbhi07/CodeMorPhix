const OptimizedResult = ({ optimized }) => {
  if (!optimized) return null;

  return (
    <div className="mt-6 bg-gray-900 border border-green-500 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-green-400 mb-2">
        AI Optimized Code
      </h2>

      <pre className="bg-black p-3 rounded text-green-300 overflow-x-auto">
        {optimized.optimized_code}
      </pre>

      <p className="mt-3 text-gray-300">
        <strong>Explanation:</strong> {optimized.explanation}
      </p>
    </div>
  );
};

export default OptimizedResult;
