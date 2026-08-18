"use client";

import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { ArrowUp, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";

import { TitanMark } from "@/components/brand/titan-mark";
import type { JarvisApiResponse, JarvisAnswer } from "@/lib/titan/contracts";

type JarvisComposerProps = {
  expanded?: boolean;
};

const starterPrompts = [
  "What is Titan observing?",
  "Explain the price-reveal decision",
  "What will not run without approval?",
];

export function JarvisComposer({ expanded = false }: JarvisComposerProps) {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState<JarvisAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submitMessage = async (value: string) => {
    const cleanMessage = value.trim();
    if (!cleanMessage || loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanMessage }),
      });
      const payload = (await response.json()) as JarvisApiResponse;
      if (!payload.ok) {
        setAnswer(null);
        setError(payload.error.message);
        return;
      }
      setAnswer(payload.data);
      setMessage("");
    } catch {
      setAnswer(null);
      setError("Jarvis could not reach the local API. No answer was invented.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitMessage(message);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void submitMessage(message);
    }
  };

  return (
    <section className={`jarvis-card panel${expanded ? " is-expanded" : ""}`}>
      <div className="jarvis-heading">
        <TitanMark compact />
        <div>
          <p className="eyebrow">Jarvis · demo shop orchestrator</p>
          <p>Ask Jarvis to create, explain, plan or analyse.</p>
        </div>
        <span className="badge badge-success"><span className="status-dot" />Online</span>
      </div>

      {expanded && (
        <div className="jarvis-intro">
          <Sparkles aria-hidden="true" size={18} />
          <div>
            <strong>Evidence first, actions second.</strong>
            <p>Jarvis answers from the fixed Titan Workwear fixture. It cannot reach a shop or execute a recommendation.</p>
          </div>
        </div>
      )}

      {(expanded || answer || error) && (
        <div className="jarvis-conversation" aria-live="polite">
          {answer ? (
            <article className="jarvis-answer">
              <div className="answer-kicker"><Sparkles size={13} />Jarvis · simulated evidence</div>
              <h3>{answer.title}</h3>
              <p>{answer.message}</p>
              {answer.evidence.length > 0 && (
                <dl>
                  {answer.evidence.map((item) => (
                    <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
                  ))}
                </dl>
              )}
              <div className="answer-safety"><ShieldCheck size={14} />{answer.safety.actionPolicy}</div>
            </article>
          ) : error ? (
            <div className="jarvis-error"><ShieldCheck size={16} /><span>{error}</span></div>
          ) : (
            <div className="jarvis-empty-copy">Choose a prompt or ask about the demo workspace.</div>
          )}
        </div>
      )}

      {expanded && (
        <div className="prompt-chips">
          {starterPrompts.map((prompt) => (
            <button disabled={loading} key={prompt} onClick={() => void submitMessage(prompt)}>{prompt}</button>
          ))}
        </div>
      )}

      <form className="jarvis-input" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="jarvis-prompt">Ask Jarvis</label>
        <input
          id="jarvis-prompt"
          maxLength={600}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask Jarvis to create three adverts, explain profit or plan next week…"
          value={message}
        />
        <button aria-label="Run with Jarvis" disabled={!message.trim() || loading} type="submit">
          {loading ? <LoaderCircle className="spin" size={15} /> : <><span>Run with Jarvis</span><ArrowUp size={14} /></>}
        </button>
      </form>
    </section>
  );
}
