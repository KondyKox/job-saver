"use server";

import { db } from "@/db";
import { offers, statusEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Status = (typeof statusEnum.enumValues)[number];

const isStatus = (v: string): v is Status =>
  (statusEnum.enumValues as readonly string[]).includes(v);

export const addOffer = async (_prev: unknown, formData: FormData) => {
  const title = String(formData.get("title"));
  const company = String(formData.get("company"));
  const url = String(formData.get("url"));
  const description = formData.get("description")?.toString().trim() || null;

  try {
    const existing = await db
      .select()
      .from(offers)
      .where(eq(offers.url, url))
      .limit(1);

    if (existing.length > 0) return { message: "Already saved" };

    await db.insert(offers).values({ title, company, description, url });
    revalidatePath("/");
  } catch (err) {
    console.error("Error adding an offer:", err);
    return { message: "Something went wrong" };
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

export const deleteOffer = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) return;

  try {
    await db.delete(offers).where(eq(offers.id, id));
  } catch (err) {
    console.error("Error deleting an offer:", err);
    return;
  }
  revalidatePath("/");
  redirect("/");
};
