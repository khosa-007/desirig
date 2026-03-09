import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100">
        <Truck className="h-10 w-10 text-orange-500" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Wrong Turn, Driver
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This page doesn&apos;t exist or may have been moved. Let&apos;s get you
        back on the highway.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Back to Home
          </Button>
        </Link>
        <Link href="/categories">
          <Button variant="outline">Browse Categories</Button>
        </Link>
      </div>
    </div>
  );
}
