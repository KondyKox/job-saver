import { db } from "@/db";
import { offers } from "@/db/schema";

const OffersList = async () => {
  const allOffers = await db.select().from(offers);

  if (!allOffers || allOffers.length === 0)
    return (
      <p className="rounded-2xl p-4 bg-neutral-700 text-xl">
        No saved job offers
      </p>
    );

  return (
    <ul className="flex flex-col justify-center items-center gap-4 bg-neutral-800 p-4 rounded-2xl">
      {allOffers.map((o) => (
        <li key={o.id}>
          {o.title} {o.company} {o.url}
        </li>
      ))}
    </ul>
  );
};

export default OffersList;
