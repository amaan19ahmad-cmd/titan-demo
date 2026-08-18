type TitanMarkProps = {
  compact?: boolean;
};

export function TitanMark({ compact = false }: TitanMarkProps) {
  return (
    <span className={`titan-brand${compact ? " titan-brand-compact" : ""}`}>
      <svg
        aria-hidden="true"
        className="titan-mark"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#83def8" d="M32 2 55 15v34L32 62 9 49V15z" />
        <path fill="#183442" d="M32 8 49 18v28L32 56 15 46V18z" />
        <path fill="#f4f8fa" d="M20 18h24v8h-8v22h-8V26h-8z" />
        <path fill="#4f8eb0" d="m32 8 17 10-5 3-12-7-12 7-5-3z" />
        <path fill="#d5e9ef" d="m28 48 4 3 4-3v-8l-4 3-4-3z" opacity=".62" />
      </svg>
      {!compact && (
        <span className="titan-wordmark">
          <strong>Titan</strong>
          <small>AI growth system</small>
        </span>
      )}
    </span>
  );
}
