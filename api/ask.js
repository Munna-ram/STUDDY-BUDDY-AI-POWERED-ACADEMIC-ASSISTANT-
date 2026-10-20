export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { question } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "A valid question is required." });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(503).json({ error: "AI is not configured yet. Add GEMINI_API_KEY to your deployment environment." });
  }

  try {
    // USING THE CORRECT MODEL: gemini-1.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: "You are StudyBuddy, a helpful academic tutor. Explain concepts clearly for a college student, use examples where helpful, and do not invent facts. If unsure, say so. Encourage learning rather than simply doing graded work for the student." }]
          },
          contents: [{ role: "user", parts: [{ text: question.trim() }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      const answer = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
      if (answer) {
        return res.status(200).json({ answer });
      } else {
        return res.status(502).json({ error: "The AI did not return an answer." });
      }
    } else {
      return res.status(502).json({ error: data.error?.message || "AI provider returned an error." });
    }
  } catch (err) {
    return res.status(502).json({ error: "Could not contact the AI service. Try again later." });
  }
}
