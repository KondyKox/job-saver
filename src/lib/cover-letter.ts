import type { offers } from "@/db/schema";
import { getProfile } from "./profile";
import { generateText } from "./gemini";

type Offer = typeof offers.$inferSelect;

export const generateCoverLetter = async (offer: Offer): Promise<string> => {
  if (!offer.description?.trim()) {
    throw new Error("Add a job description first.");
  }

  const profile = await getProfile();

  const prompt = `You write cover letters for the candidate described below.

RULES:
- Use ONLY facts from the CANDIDATE section. Never invent skills, experience, years, employers or achievements.
- If the offer asks for something the candidate doesn't have, don't claim it. Focus on what does match, and show willingness to learn.
- Write in the same language as the job offer.
- 180-250 words, 3 short paragraphs, no placeholders like [Your Name].
- Be specific and natural. No clichés like "I am writing to express my interest" or "passionate team player".
- Mention 1-2 relevant projects from the candidate's list, not all of them.
- Output only the letter text, no commentary.

# JOB OFFER
Title: ${offer.title}
Company: ${offer.company}
Description:
${offer.description}

# CANDIDATE
${profile}`;

  return generateText(prompt);
};
