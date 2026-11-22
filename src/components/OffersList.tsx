import { db } from "@/db";
import { offers } from "@/db/schema";

type Status = "saved" | "applied" | "interview" | "rejected";

const OffersList = async () => {
  const allOffers = await db.select().from(offers);

  const statusColor: Record<Status, string> = {
    saved: "text-blue-400",
    applied: "text-green-400",
    interview: "text-yellow-500",
    rejected: "text-red-500",
  };

  if (!allOffers || allOffers.length === 0)
    return (
      <p className="rounded-2xl p-4 bg-neutral-700 text-xl">
        No saved job offers
      </p>
    );

  return (
    <ul className="grid md:grid-cols-2 gap-4 bg-neutral-800 p-4 rounded-2xl">
      {allOffers.map((o) => (
        <li
          key={o.id}
          className="flex flex-col justify-center gap-4 w-full p-4 bg-neutral-900 rounded-xl max-h-75 overflow-y-auto"
        >
          <h2 className="text-2xl font-bold">{o.title}</h2>
          <span className="">{o.company}</span>
          <div className="flex justify-between items-center">
            <a
              href={o.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs bg-blue-500 w-fit hover:bg-white hover:text-blue-500 italic font-bold"
            >
              Check offer
            </a>
            <span className={`italic text-xs ${statusColor[o.status]}`}>
              {o.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OffersList;
