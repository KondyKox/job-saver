import { addOffer } from "@/app/actions";

const AddOfferForm = () => {
  return (
    <form
      action={addOffer}
      className="bg-neutral-800 rounded-2xl px-4 py-8 flex flex-col gap-4 justify-center items-center w-full"
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
        className="btn border-4 border-green-700 w-full bg-green-500 hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddOfferForm;
