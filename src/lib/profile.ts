import { readFile } from "node:fs/promises";
import path from "node:path";

const PROFILE_PATH = path.join(process.cwd(), "profile.local.md");

export const getProfile = async (): Promise<string> => {
  try {
    return await readFile(PROFILE_PATH, "utf-8");
  } catch (err) {
    console.error("Failed getting profile:", err);
    throw new Error(
      "profile.local.md not found. Create it in the project root.",
    );
  }
};
