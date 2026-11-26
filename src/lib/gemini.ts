import { GoogleGenAI } from "@google/genai";

const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite"];
const MAX_ATTEMPTS = 2;
const RETRYABLE = new Set([429, 500, 503, 504]);

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function generateText(prompt: string): Promise<string> {
  let lastError: unknown;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        if (!response.text) throw new Error("Gemini returned no text");
        return response.text;
      } catch (err) {
        lastError = err;
        const status = (err as { status?: number }).status;
        if (status === undefined || !RETRYABLE.has(status)) throw err;
        if (attempt < MAX_ATTEMPTS) await sleep(1000 * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError;
}
