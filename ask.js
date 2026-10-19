
export default async function handler(req, res) {
  const allowedOrigin = "https://munna-ram.github.io";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const question =
    typeof req.body?.question === "string"
      ? req.body.question.trim()
      : "";

  if (!question || question.length > 4000) {
    return res.status(400).json({
      error: "Enter a question under 4000 characters."
    });
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return res.status(503).json({
      error: "AI is not configured. Check GEMINI_API_KEY."
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: "You are StudyBuddy, a helpful academic assistant for B.Tech students. Explain concepts clearly, help with assignments and programming, and show step-by-step solutions."
            }]
          },
          contents: [{
            role: "user",
            parts: [{ text: question }]
          }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1200
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: data.error?.message || "Gemini API request failed."
      });
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("") || "";

    if (!answer) {
      return res.status(502).json({
        error: "The AI returned no answer. Please try again."
      });
    }

    return res.status(200).json({ answer });
  } catch {
    return res.status(502).json({
      error: "Could not contact the AI service. Please try again."
    });
  }
}
