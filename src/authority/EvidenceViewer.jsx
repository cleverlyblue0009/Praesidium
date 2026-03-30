const EvidenceViewer = ({ evidence }) => (
  <section className="evidence-viewer">
    <header className="panel-header">
      <div>
        <p className="meta-label">Evidence Vault</p>
        <h3>Verified Integrity</h3>
      </div>
      <span className="verified-integrity-tag">Verified Integrity</span>
    </header>
    <div className="evidence-grid">
      {evidence.map((item) => (
        <article key={`${item.name}-${item.hash}`} className="evidence-panel">
          <div className="preview-block">
            <span>{item.type === 'video' ? 'Video' : 'Image'}</span>
          </div>
          <h4>{item.name}</h4>
          <p className="muted">{item.timestamp}</p>
          <code>{item.hash}</code>
        </article>
      ))}
    </div>
  </section>
);

export default EvidenceViewer;
