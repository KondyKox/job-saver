import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-3.8-flash";
const RETRAYABLE = new Set([429, 500, 503, 504]);
const MAX_ATTEMPTS = 3;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function generateText(prompt: string): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("Gemini returned no text");
      }
      return response.text;
    } catch (err) {
      const status = (err as { status?: number }).status;
      const retrayable = status !== undefined && RETRAYABLE.has(status);

      if (!retrayable || attempt >= MAX_ATTEMPTS) throw err;

      await sleep(1000 * 2 ** (attempt - 1));
    }
  }
}
