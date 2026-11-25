import { deleteOffer, updateStatus } from "@/app/actions";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import StatusSelect from "@/components/StatusSelect";
import { db } from "@/db";
import { offers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
      <Link
        href="/"
        className="text-neutral-400 hover:text-white hover:bg-red-400 px-4 py-2 rounded-2xl transition-colors duration-200 
                    w-fit absolute top-4 left-4 flex justify-center items-center gap-2"
      >
        <ArrowLeft size={18} /> <span className="hidden md:block">Go Back</span>
      </Link>

      <header className="flex flex-col justify-center items-center gap-2 bg-neutral-800 rounded-2xl p-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">{offer.title}</h1>
        <p className="text-lg text-neutral-400">{offer.company}</p>

        <div className="flex justify-between items-center gap-2 w-full mt-4">
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
            <button
              className="btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white italic font-bold text-xs"
              title="Delete offer"
            >
              Delete
            </button>
          </form>

          <form action={updateStatus} className="flex items-center gap-2">
            <input type="hidden" name="id" value={offer.id} />
            <StatusSelect key={offer.status} current={offer.status} />
          </form>
        </div>
      </header>

      <section className="rounded-2xl p-4 bg-neutral-700 h-72 flex flex-col gap-2">
        <h2>Job description</h2>
        {offer.description ? (
          <p className="whitespace-pre-wrap">{offer.description}</p>
        ) : (
          <p className="text-xl text-red-300">No description</p>
        )}
      </section>

      <CoverLetterGenerator />
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
