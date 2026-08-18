"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#06151c", color: "#eef8fb", fontFamily: "Arial, sans-serif" }}>
        <main style={{ display: "grid", minHeight: "100vh", placeItems: "center", padding: 24 }}>
          <section style={{ maxWidth: 480, textAlign: "center" }}>
            <p style={{ color: "#7ddcf7", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase" }}>Titan safety boundary</p>
            <h1>Something interrupted the command centre.</h1>
            <p style={{ color: "#9db1b9", lineHeight: 1.6 }}>Titan stopped rendering instead of presenting uncertain data.</p>
            <button onClick={reset} style={{ border: 0, borderRadius: 8, padding: "11px 16px", background: "#7ddcf7", color: "#06212b", fontWeight: 700 }}>Try again</button>
          </section>
        </main>
      </body>
    </html>
  );
}
