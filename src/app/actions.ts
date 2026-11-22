"use server";

import { db } from "@/db";
import { offers, statusEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Status = (typeof statusEnum.enumValues)[number];

const isStatus = (v: string): v is Status =>
  (statusEnum.enumValues as readonly string[]).includes(v);

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

export const updateStatus = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));

  // reject anything that isn't a real id / a real status
  if (!Number.isInteger(id) || !isStatus(status)) return;

  try {
    await db.update(offers).set({ status }).where(eq(offers.id, id));
    revalidatePath("/");
  } catch (err) {
    console.error("Error updating offer's status:", err);
  }
};
