import AddOfferForm from "@/components/AddOfferForm";
import OffersList from "@/components/OffersList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-5xl font-bold">Job Saver</h1>
      <AddOfferForm />
      <Suspense fallback={<p>Loading...</p>}>
        <OffersList />
      </Suspense>
    </main>
  );
}
