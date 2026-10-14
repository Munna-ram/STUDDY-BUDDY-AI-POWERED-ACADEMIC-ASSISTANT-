// Vercel serverless function. Keep GEMINI_API_KEY in Vercel Environment Variables.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question || question.length > 4000) {
    return res.status(400).json({ error: "Enter a question under 4000 characters." });
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: "AI is not configured yet. Add GEMINI_API_KEY to your deployment environment." });
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: "You are StudyBuddy, a helpful academic tutor. Explain concepts clearly for a college student, use examples where helpful, and do not invent facts. If unsure, say so. Encourage learning rather than simply doing graded work for the student." }]
          },
          contents: [{ role: "user", parts: [{ text: question }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        })
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: data.error?.message || "AI provider returned an error." });
    }
    const answer = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
    if (!answer) return res.status(502).json({ error: "The AI did not return an answer. Please try again." });
    return res.status(200).json({ answer });
  } catch {
    return res.status(502).json({ error: "Could not contact the AI service. Try again later." });
  }
}
