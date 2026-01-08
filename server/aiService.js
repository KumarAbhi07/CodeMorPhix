import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeCode(payload) {
  const prompt = `
You are a senior software engineer.

Given:
- Programming Language: ${payload.language}
- Original Code:
${payload.code}

- Time Complexity: ${payload.time}
- Space Complexity: ${payload.space}
- Issues: ${payload.issues.join(", ")}

Tasks:
1. Provide optimized code (same language)
2. Improve time/space complexity if possible
3. Explain the optimization clearly
4. If no optimization is possible, explain why

Respond in JSON with keys:
optimized_code, explanation
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
