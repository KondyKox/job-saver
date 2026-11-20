import { addOffer } from "@/app/actions";

const AddOfferForm = () => {
  return (
    <form
      action={addOffer}
      className="bg-neutral-800 rounded-2xl px-4 py-8 flex flex-col gap-4 justify-center items-center w-full md:w-1/2"
    >
      <div className="field">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Job title"
          required
        />
        <label htmlFor="title">Title</label>
      </div>

      <div className="field">
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Company's name"
          required
        />
        <label htmlFor="company">Company</label>
      </div>

      <div className="field">
        <input
          type="url"
          id="url"
          name="url"
          placeholder="URL to job offer"
          required
        />
        <label htmlFor="url">URL</label>
      </div>

      <button
        type="submit"
        className="border-4 border-green-700 cursor-pointer rounded-2xl px-4 py-2 w-full bg-green-500 transition-colors duration-200 ease-in-out hover:bg-green-700 active:scale-90"
      >
        Add
      </button>
    </form>
  );
};

export default AddOfferForm;
