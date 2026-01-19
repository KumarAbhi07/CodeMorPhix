import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeWithAI({ code, language, time, space, issues = [] }) {
  const prompt = `You are a senior software engineer specializing in code optimization.

Language: ${language}

Original Code:
\`\`\`${language}
${code}
\`\`\`

Current Analysis:
- Time Complexity: ${time}
- Space Complexity: ${space}
- Issues: ${issues.join(", ") || "None"}

Task:
1. Analyze the code and provide an optimized version
2. Improve time/space complexity if possible
3. Fix any issues identified
4. Provide clear explanation of changes

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "optimized_code": "your optimized code here",
  "optimized_time": "improved time complexity (e.g., O(n))",
  "optimized_space": "improved space complexity (e.g., O(1))",
  "explanation": "detailed explanation of optimizations"
}`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;

    try {
      const parsed = JSON.parse(content);
      return {
        optimized_code: parsed.optimized_code || code,
        optimized_time: parsed.optimized_time || time,
        optimized_space: parsed.optimized_space || space,
        explanation: parsed.explanation || "Code analyzed successfully."
      };
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        optimized_code: code,
        optimized_time: time,
        optimized_space: space,
        explanation: content || "Unable to parse optimization response."
      };
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`OpenAI optimization failed: ${error.message}`);
  }
}
