const ResultPanel = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg text-white space-y-2">
      <h2 className="text-xl font-semibold">Analysis Result</h2>

      <p><strong>Time Complexity:</strong> {result.time}</p>
      <p><strong>Space Complexity:</strong> {result.space}</p>
      <p><strong>Confidence:</strong> {result.confidence}</p>

      <div>
        <strong>Detected Patterns:</strong>
        <ul className="list-disc ml-6">
          {result.patterns.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Issues:</strong>
        <ul className="list-disc ml-6">
          {result.issues.map((issue, i) => (
            <li key={i}>{issue}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Optimization Hints:</strong>
        <ul className="list-disc ml-6 text-green-400">
          {result.optimizations.map((opt, i) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPanel;
