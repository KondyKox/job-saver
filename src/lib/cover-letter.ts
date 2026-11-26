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
- Use ONLY facts from the CANDIDATE section. Never invent skills, experience or achievements.
- Structure exactly: 
  1) Opening: name the company and the role, and say what in THIS offer's description is relevant to the candidate (a specific requirement or product detail, not a generic compliment).
  2) Body: pick the 1-2 projects that best match the offer's requirements and explain what the candidate built and which technologies from the offer it used. Do NOT list the whole tech stack or all projects.
  3) Close: 1-2 sentences, availability and a call to talk. 
- If a key requirement of the offer isn't in the profile, don't claim it. Briefly say the candidate is learning it only if it's honest to do so.
- Mention languages or education only if the offer asks for them.
- Forbidden phrases: "eager to learn", "adapt quickly", "passionate", "team player", "I am writing to".
- Greeting in the letter's language: Polish -> "Szanowni Państwo,"; English -> "Dear {company} team,".
- Write natural, simple sentences, no corporate phrasing
- Same language as the job description. 3 paragraphs, 2-3 sentence each, about 150-200 words. Output only the letter.

# JOB OFFER
Title: ${offer.title}
Company: ${offer.company}
Description:
${offer.description}

# CANDIDATE
${profile}`;

  return generateText(prompt);
};
