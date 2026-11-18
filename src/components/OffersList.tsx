import { db } from "@/db";
import { offers } from "@/db/schema";

const OffersList = async () => {
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
};

export default OffersList;
