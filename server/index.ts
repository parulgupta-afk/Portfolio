/**
 * Optional portfolio API — npm run api
 * Env: GEMINI_API_KEY, PORT (default 8787), CORS_ORIGIN
 */
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8787);
const ORIGIN = process.env.CORS_ORIGIN || '*';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '256kb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'portfolio-api' }));

app.get('/api/projects', (_req, res) => {
  res.json({
    message: 'Projects live in the Vite client (src/data/portfolioData.ts).',
    endpoints: ['GET /health', 'POST /api/ai/chat'],
  });
});

app.post('/api/ai/chat', async (req, res) => {
  const message = String(req.body?.message || '').slice(0, 2000);
  const context = String(req.body?.context || '').slice(0, 100000);
  if (!message) return res.status(400).json({ error: 'message_required' });

  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    return res.status(503).json({
      error: 'gemini_unconfigured',
      hint: 'Set GEMINI_API_KEY or use client local retriever',
    });
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: key });
    const prompt = `You are PARUL_OS, a portfolio agent for Parul Gupta.
Only use the CONTEXT JSON below. Never invent projects, employers, or metrics.
If unsure, say what is unknown and suggest browsing projects.
Return concise answer with short bullets.

CONTEXT:
${context}

USER:
${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    const text =
      (response as any).text ||
      (response as any).candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('\n') ||
      '';

    const bullets = String(text)
      .split('\n')
      .map((l: string) => l.replace(/^[-*•\d.]+\s*/, '').trim())
      .filter((l: string) => l.length > 8)
      .slice(0, 8);

    res.json({
      intent: 'GEMINI_GROUNDED',
      summary: String(text).slice(0, 1200) || 'No response',
      bullets: bullets.length ? bullets : [String(text).slice(0, 200)],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'gemini_failed', detail: String(err?.message || err) });
  }
});

app.listen(PORT, () => {
  console.log(`portfolio-api on :${PORT}`);
});
