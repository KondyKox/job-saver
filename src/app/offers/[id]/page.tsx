import { deleteOffer } from "@/app/actions";
import StatusSelect from "@/components/StatusSelect";
import { db } from "@/db";
import { offers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

type Props = { params: Promise<{ id: string }> };

async function OfferDetails({ params }: Props) {
  await connection();
  const { id } = await params;
  const offerId = Number(id);

  if (!Number.isInteger(offerId) || offerId <= 0) notFound();

  const [offer] = await db
    .select()
    .from(offers)
    .where(eq(offers.id, offerId))
    .limit(1);

  if (!offer) notFound();

  return (
    <main>
      <header className="flex flex-col justify-center items-center gap-2 bg-neutral-800 rounded-2xl p-4">
        <h1>{offer.title}</h1>
        <p className="text-xl text-neutral-400">{offer.company}</p>

        <div className="flex justify-between items-center gap-2 w-full">
          <form
            action={deleteOffer}
            className="flex justify-center items-stretch gap-2"
          >
            <input type="hidden" name="id" value={offer.id} />

            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn link"
            >
              Check offer
            </a>
            <button className="btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white italic font-bold text-xs">
              Delete
            </button>
          </form>

          <StatusSelect current={offer.status} />
        </div>
      </header>

      <div className="rounded-2xl p-4 bg-neutral-700 text-xl">
        {offer.description ? (
          <p className="whitespace-pre-wrap">{offer.description}</p>
        ) : (
          <p>No description</p>
        )}
      </div>
    </main>
  );
}

export default function OfferPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OfferDetails params={params} />
    </Suspense>
  );
}
