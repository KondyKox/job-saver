import AddOfferForm from "@/components/AddOfferForm";
import OffersList from "@/components/OffersList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <h1 className="text-5xl md:text-6xl">Job Saver</h1>
      <AddOfferForm />
      <Suspense fallback={<p>Loading...</p>}>
        <OffersList />
      </Suspense>
    </main>
  );
}
