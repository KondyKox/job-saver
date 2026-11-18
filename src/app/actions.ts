"use server";

import { db } from "@/db";
import { offers } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addOffer = async (formData: FormData) => {
  const title = String(formData.get("title"));
  const company = String(formData.get("company"));
  const url = String(formData.get("url"));

  await db.insert(offers).values({ title, company, url });
  revalidatePath("/");
};
