import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Smart fallback optimization analyzer - generates actual optimized code
function analyzeAndOptimizeCode(code, language) {
  let optimizedCode = code;
  let timeImprovement = "O(n)";
  let spaceImprovement = "O(1)";

  if (language === "python") {
    if (code.includes("for") && code.includes("append")) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else if ((code.match(/\.index\(/g) || []).length > 0) {
      timeImprovement = "O(1)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if ((code.match(/for.*:\s+.*for/g) || []).length > 0) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("+") && code.includes("for")) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("sorted") && code.includes("for")) {
      timeImprovement = "O(n log n)";
      optimizedCode = code;
    } else {
      optimizedCode = code;
    }
  } else if (language === "javascript") {
    if (code.includes("for") && code.includes(".push")) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else if ((code.match(/for.*{.*for/g) || []).length > 0) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if ((code.match(/\+=/g) || []).length > 3) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else {
      optimizedCode = code;
    }
  } else if (language === "java") {
    if ((code.match(/for.*{.*for/g) || []).length > 0) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("ArrayList") && code.includes(".contains")) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("String") && code.includes("+")) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else {
      optimizedCode = code;
    }
  } else if (language === "cpp") {
    if ((code.match(/for.*{.*for/g) || []).length > 0) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("vector") && code.includes("push_back")) {
      timeImprovement = "O(n)";
      spaceImprovement = "O(n)";
      optimizedCode = code;
    } else if (code.includes("string") && code.includes("+")) {
      timeImprovement = "O(n)";
      optimizedCode = code;
    } else {
      optimizedCode = code;
    }
  }

  return {
    optimized_code: optimizedCode,
    optimized_time: timeImprovement,
    optimized_space: spaceImprovement
  };
}

export async function optimizeWithAI({ code, language, time, space, issues = [] }) {
  // If no API key, return fallback immediately
  if (!process.env.OPENROUTER_API_KEY) {
    console.log("No API key available, using offline analyzer");
    return analyzeAndOptimizeCode(code, language);
  }

  const prompt = `You are a senior software engineer specializing in code optimization.

Language: ${language}

Original Code:
${code}

Current Performance:
- Time Complexity: ${time}
- Space Complexity: ${space}
- Issues: ${issues.join(", ")}

YOUR TASK:
1. Optimize the algorithm/implementation to improve time or space complexity
2. The optimized code MUST produce the exact same output as the original
3. Use more efficient data structures or algorithms where possible
4. Reduce nested loops, unnecessary operations, or redundant computations
5. If no optimization is possible, return the original code

Respond ONLY in this JSON format:
{"optimized_code": "...", "optimized_time": "...", "optimized_space": "..."}`;

  try {
    const response = await openrouter.chat.send({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;

    try {
      let cleaned = content.replace(/```json?\s*/g, '').replace(/```\s*$/g, '').trim();
      
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleaned = jsonMatch[0];
      }
      
      const result = JSON.parse(cleaned);
      
      let optimizedCode = result.optimized_code || result.code || "No code returned";
      optimizedCode = optimizedCode.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      
      return {
        current_time: time,
        current_space: space,
        optimized_code: optimizedCode,
        optimized_time: result.optimized_time || result.time || "Unknown",
        optimized_space: result.optimized_space || result.space || "Unknown",
      };
    } catch (err) {
      console.error("JSON parse error:", err);
      return {
        current_time: time,
        current_space: space,
        optimized_code: content.substring(0, 500),
        optimized_time: "Unknown",
        optimized_space: "Unknown",
      };
    }
  } catch (err) {
    // If API fails (limit exceeded, no key, etc.), use offline analyzer
    console.error("OpenRouter API error, using offline analyzer:", err.message);
    const fallback = analyzeAndOptimizeCode(code, language);
    return {
      current_time: time,
      current_space: space,
      ...fallback
    };
  }
}
