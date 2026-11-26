"use client";

import { generateCoverLetterAction } from "@/app/actions";
import { Check, Copy, Download } from "lucide-react";
import { useActionState, useRef, useState } from "react";

const CoverLetterGenerator = ({ offerId }: { offerId: number }) => {
  const [state, formAction, isPending] = useActionState(
    generateCoverLetterAction,
    undefined,
  );
  const coverLetterRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetterRef.current?.value ?? "");

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

      <form action={formAction} className="mt-2">
        <input type="hidden" name="id" id="id" value={offerId} />
        <button
          className={
            "btn border-2 w-full text-xs border-green-500 text-green-500 hover:text-white hover:bg-green-400"
          }
          title="Generate cover letter"
          disabled={isPending}
        >
          {isPending ? (
            <span className="inline-flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  .
                </span>
              ))}
            </span>
          ) : (
            "Generate Cover Letter"
          )}
        </button>
      </form>

      <hr className="border rounded-2xl my-6 border-neutral-400" />

      <div className="flex flex-col gap-4">
        <h2>Generated Cover Letter</h2>
        <div className="w-full relative">
          <textarea
            ref={coverLetterRef}
            key={state?.coverLetter}
            defaultValue={state?.coverLetter ?? ""}
            name="coverLetter"
            id="coverLetter"
            className="bg-neutral-700 rounded-xl p-4 w-full h-72"
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
          className="btn flex justify-center items-center gap-2 bg-green-500 hover:bg-green-700"
          title="Download cover letter"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>
    </section>
  );
};

export default CoverLetterGenerator;
