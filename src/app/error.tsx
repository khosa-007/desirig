"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We hit an unexpected bump in the road. Try again or head back to the
        home page.
      </p>
      <div className="mt-8 flex gap-3">
        <Button
          onClick={reset}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Try Again
        </Button>
        <a href="/">
          <Button variant="outline">Back to Home</Button>
        </a>
      </div>
    </div>
  );
}
