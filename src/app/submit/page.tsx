import type { Metadata } from "next";
import { SubmitForm } from "./submit-form";

export const metadata: Metadata = {
  title: "Submit a Desi Stop",
  description:
    "Know a hidden desi spot? Submit truck stops with desi food, Punjabi businesses, or any desi-owned business for the DesiRig community.",
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Submit a Desi Stop
        </h1>
        <p className="mt-2 text-gray-400">
          Know a hidden desi spot that truckers should know about? A dhaba
          behind a truck stop? A Punjabi-owned business not on our list?
          Submit it here and help the community.
        </p>
        <p className="mt-1 font-gurmukhi text-sm text-[#FACC15]/70">
          ਕੋਈ ਲੁਕਿਆ ਹੋਇਆ ਦੇਸੀ ਸਪੌਟ ਪਤਾ ਹੈ? ਇੱਥੇ ਦੱਸੋ — ਭਾਈਚਾਰੇ ਦੀ ਮਦਦ ਕਰੋ।
        </p>

        <div className="mt-8">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}
