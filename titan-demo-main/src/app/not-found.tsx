import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TitanMark } from "@/components/brand/titan-mark";

export default function NotFound() {
  return (
    <main className="state-page">
      <section className="state-card">
        <TitanMark />
        <p className="eyebrow" style={{ marginTop: 24 }}>404 · route unavailable</p>
        <h1>This Titan view does not exist.</h1>
        <p>The command centre has not invented a destination for this address.</p>
        <Link className="button button-primary" href="/"><ArrowLeft size={15} />Return to overview</Link>
      </section>
    </main>
  );
}
