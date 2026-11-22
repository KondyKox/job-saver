"use server";

import { db } from "@/db";
import { offers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addOffer = async (_prev: unknown, formData: FormData) => {
  try {
    const title = String(formData.get("title"));
    const company = String(formData.get("company"));
    const url = String(formData.get("url"));

    const existing = await db
      .select()
      .from(offers)
      .where(eq(offers.url, url))
      .limit(1);

    if (existing.length > 0) return { message: "Already saved" };

    await db.insert(offers).values({ title, company, url });
    revalidatePath("/");
  } catch (err) {
    console.error("Error adding an offer:", err);
  }
};
