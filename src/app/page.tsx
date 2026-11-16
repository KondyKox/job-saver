import { db } from "@/db";
import { offers } from "@/db/schema";
import { Suspense } from "react";

async function OffersList() {
  const allOffers = await db.select().from(offers);
  return (
    <ul>
      {allOffers.map((o) => (
        <li key={o.id}>
          {o.title} {o.company} {o.url}
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  return (
    <main>
      <h1>Job Saver</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <OffersList />
      </Suspense>
    </main>
  );
}
