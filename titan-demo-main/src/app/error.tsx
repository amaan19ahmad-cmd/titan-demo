"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";

import { TitanMark } from "@/components/brand/titan-mark";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="state-page">
      <section className="state-card">
        <TitanMark />
        <TriangleAlert aria-hidden="true" color="var(--amber)" size={26} style={{ marginTop: 24 }} />
        <h1>Titan could not load this view.</h1>
        <p>No substitute data has been shown. Retry the server render when you are ready.</p>
        <button className="button button-primary" onClick={reset}><RotateCcw size={15} />Try again</button>
      </section>
    </main>
  );
}
