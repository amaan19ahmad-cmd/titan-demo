export default function Loading() {
  return (
    <div aria-label="Loading Titan dashboard" className="loading-shell" role="status">
      <div className="loading-sidebar" />
      <div className="loading-main">
        <div className="skeleton" style={{ height: 126 }} />
        <div className="skeleton" style={{ height: 92, marginTop: 12 }} />
        <div className="skeleton" style={{ height: 62, marginTop: 12 }} />
        <div className="skeleton" style={{ height: 480, marginTop: 12 }} />
        <span className="sr-only">Titan is loading.</span>
      </div>
    </div>
  );
}
