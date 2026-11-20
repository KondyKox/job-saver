import AddOfferForm from "@/components/AddOfferForm";
import OffersList from "@/components/OffersList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-stretch gap-8 min-h-screen w-full lg:w-1/2">
      <h1 className="text-6xl font-bold text-center">Job Saver</h1>
      <AddOfferForm />
      <Suspense fallback={<p>Loading...</p>}>
        <OffersList />
      </Suspense>
    </main>
  );
}
