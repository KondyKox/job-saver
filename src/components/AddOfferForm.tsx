"use client";

import { addOffer } from "@/app/actions";
import { useActionState } from "react";

const AddOfferForm = () => {
  const [state, formAction, pending] = useActionState(addOffer, null);

  return (
    <form
      action={formAction}
      className="bg-neutral-800 rounded-2xl px-4 py-8 flex flex-col gap-4 justify-center items-center w-full"
    >
      <div className="field">
        <input type="text" id="title" name="title" placeholder=" " required />
        <label htmlFor="title">Title</label>
      </div>

      <div className="field">
        <input
          type="text"
          id="company"
          name="company"
          placeholder=" "
          required
        />
        <label htmlFor="company">Company</label>
      </div>

      <div className="field">
        <textarea
          id="description"
          name="description"
          placeholder=" "
          required
        />
        <label htmlFor="description">Description</label>
      </div>

      <div className="field">
        <input type="url" id="url" name="url" placeholder=" " required />
        <label htmlFor="url">URL</label>
      </div>

      {state?.message && <p className="text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="btn border-4 border-green-700 w-full bg-green-500 hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddOfferForm;
