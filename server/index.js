import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

const app = express();

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

  const safeCode = JSON.stringify(code);

  exec(`python ../analyzer/analyze.py ${safeCode}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Python analyzer failed" });
    }
    res.json(JSON.parse(stdout));
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
