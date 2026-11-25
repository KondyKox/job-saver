import { deleteOffer, updateStatus } from "@/app/actions";
import { db } from "@/db";
import { offers } from "@/db/schema";
import StatusSelect from "./StatusSelect";
import { Trash } from "lucide-react";
import Link from "next/link";

const OffersList = async () => {
  const allOffers = await db.select().from(offers);

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
          className="flex flex-col justify-center gap-3 w-full p-4 bg-neutral-900 rounded-xl max-h-75 overflow-y-auto"
        >
          <div className="flex justify-between items-start gap-2">
            <h2>
              <Link
                href={`/offers/${o.id}`}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                {o.title}
              </Link>
            </h2>
            <form action={updateStatus} className="flex items-center gap-2">
              <input type="hidden" name="id" value={o.id} />
              <StatusSelect key={o.status} current={o.status} />
            </form>
          </div>

          <span className="text-base text-neutral-400">{o.company}</span>

          <div className="flex justify-between items-center mt-2">
            <a
              href={o.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn link"
            >
              Check offer
            </a>

            <form action={deleteOffer}>
              <input type="hidden" name="id" value={o.id} />
              <button
                type="submit"
                className="btn text-red-500 hover:text-white hover:bg-red-500"
              >
                <Trash size={14} />
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OffersList;
