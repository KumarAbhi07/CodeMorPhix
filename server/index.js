import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { spawn } from "child_process";
import { optimizeWithAI } from "./aiService.js";

dotenv.config();

const app = express();

const pythonCmd = process.env.PYTHON_PATH || (process.platform === "win32" ? "py" : "python3");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodeMorphix Backend Running 🚀");
});

app.post("/analyze", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  if (language !== "python") {
    return res.json({
      time: "Coming soon",
      space: "Coming soon",
      confidence: "Low",
      patterns: [],
      issues: ["Only Python supported currently"],
      optimizations: [],
    });
  }

  const args = process.platform === "win32" && pythonCmd === "py"
    ? ["-3", "../analyzer/analyze.py"]
    : ["../analyzer/analyze.py"];

  const python = spawn(pythonCmd, args);
  let stdout = "";
  let stderr = "";

  python.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  python.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      console.error("Python analyzer failed", stderr);
      return res.json({
        time: "Unknown",
        space: "Unknown",
        confidence: "Low",
        patterns: [],
        issues: ["Analyzer unavailable: install Python 3 or set PYTHON_PATH"],
        optimizations: [],
      });
    }
    try {
      res.json(JSON.parse(stdout));
    } catch (parseErr) {
      console.error("Failed to parse analyzer output", parseErr);
      res.json({
        time: "Unknown",
        space: "Unknown",
        confidence: "Low",
        patterns: [],
        issues: ["Failed to parse analysis results"],
        optimizations: [],
      });
    }
  });

  python.stdin.write(code);
  python.stdin.end();
});

app.post("/optimize", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    const aiResult = await optimizeWithAI(req.body);
    res.json(aiResult);
  } catch (err) {
    console.error("/optimize failed", err);
    res.status(500).json({ error: "Optimization failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});