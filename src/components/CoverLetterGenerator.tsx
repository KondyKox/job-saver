"use client";

import { Check, Copy, Download } from "lucide-react";
import { useRef, useState } from "react";

const CoverLetterGenerator = () => {
  const coverLetterRef = useRef<HTMLTextAreaElement>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="bg-neutral-800 p-4 rounded-2xl flex flex-col gap-2 border-2 border-green-400 items-stretch">
      <h2>Cover Letter</h2>
      <p className="text-sm text-neutral-400">
        Generate personalized cover letter using AI.
      </p>

      <form action={undefined} className="mt-2">
        <button
          className="btn border-2 w-full text-xs border-green-500 text-green-500 hover:text-white hover:bg-green-400"
          title="Generate cover letter"
        >
          Generate Cover Letter
        </button>
      </form>

      <hr className="border rounded-2xl my-6 border-neutral-400" />

      <form action={undefined} className="flex flex-col gap-4">
        <h2>Generated Cover Letter</h2>
        <div className="w-full relative">
          <textarea
            ref={coverLetterRef}
            name="coverLetter"
            id="coverLetter"
            className="bg-neutral-700 rounded-xl p-4 w-full"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          <button
            className="btn absolute top-2 right-2 hover:bg-neutral-500"
            title={copied ? "Copied!" : "Copy to clipboard"}
            type="button"
            onClick={handleCopyToClipboard}
          >
            <span className="relative flex items-center justify-center">
              <Copy
                size={16}
                className={`transition-all duration-200 ${
                  copied
                    ? "opacity-0 scale-50 rotate-45"
                    : "opacity-100 scale-100 rotate-0"
                }`}
              />

              <Check
                size={16}
                className={`absolute text-green-400 transition-all duration-200 ${
                  copied
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-50 -rotate-45"
                }`}
              />
            </span>
          </button>
        </div>
        <button
          type="submit"
          className="btn flex justify-center items-center gap-2 bg-green-500 hover:bg-green-700"
          title="Download cover letter"
        >
          <Download size={16} /> Download PDF
        </button>
      </form>
    </section>
  );
};

export default CoverLetterGenerator;
