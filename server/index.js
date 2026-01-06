const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodeMorphix Backend Running 🚀");
});

// Helpful GET endpoint to show how to call the POST /analyze route
app.get("/analyze", (req, res) => {
  res.json({
    message: "Use POST /analyze with JSON body { code: string, language: 'python' }",
    example: {
      code: "for i in range(n):\\n    for j in range(n):\\n        print(i, j)",
      language: "python"
    }
  });
});

// JavaScript-based complexity analyzer
function analyzeCodeJS(code) {
  let maxLoopDepth = 0;
  let hasRecursion = false;
  let issues = [];

  const lines = code.split("\n");

  // Stack of indentation levels where loops start
  const loopStack = [];

  // Track current function for recursion detection
  let currentFunction = null;
  let currentFunctionIndent = null;

  for (let line of lines) {
    const raw = line;
    const trimmed = raw.trim();
    if (trimmed === "") continue;

    const indentMatch = raw.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    // If we are inside a function, detect calls to itself for recursion
    if (currentFunction && indent > currentFunctionIndent) {
      if (new RegExp(`\\b${currentFunction}\\s*\\(`).test(trimmed)) {
        hasRecursion = true;
      }
    } else if (currentFunction && indent <= currentFunctionIndent) {
      // left the function body
      currentFunction = null;
      currentFunctionIndent = null;
    }

    // Detect function definition
    const defMatch = trimmed.match(/^def\s+(\w+)\s*\(/);
    if (defMatch) {
      currentFunction = defMatch[1];
      currentFunctionIndent = indent;
    }

    // Pop loop stack when current indent is less or equal previous loop indent
    while (loopStack.length > 0 && indent <= loopStack[loopStack.length - 1]) {
      loopStack.pop();
    }

    // Detect loops (Python-style: for ... or while ... at start)
    if (/^(for|while)\b/.test(trimmed)) {
      loopStack.push(indent);
      maxLoopDepth = Math.max(maxLoopDepth, loopStack.length);
    }
  }

  // Time complexity
  let time = "O(1)";
  if (hasRecursion) {
    time = "O(n)";
    issues.push("Recursion detected");
  } else if (maxLoopDepth === 1) {
    time = "O(n)";
  } else if (maxLoopDepth > 1) {
    time = `O(n^${maxLoopDepth})`;
    issues.push("Nested loops detected");
  }

  // Space complexity heuristic
  let space = "O(1)";
  const varCount = (code.match(/\b\w+\s*=\s*/g) || []).length;
  if (varCount > 5 || hasRecursion) {
    space = "O(n)";
  }

  return {
    time,
    space,
    issues,
  };
}

app.post("/analyze", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  console.log("Analyzing code for language:", language);
  console.log("Code:", code);

  if (language === "python") {
    const result = analyzeCodeJS(code);
    console.log("Analysis result:", result);
    return res.json(result);
  }

  res.json({
    time: "Coming soon",
    space: "Coming soon",
    issues: ["Only Python supported today"],
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
